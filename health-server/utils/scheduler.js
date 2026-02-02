// utils/scheduler.js
import cron from 'node-cron';
import Alert from '../models/alert.js';
import { sendEmail } from './mailer.js';

export function startScheduler() {
  console.log('⏰ Scheduler started...');

  // Every minute (for testing). Change to "0 * * * *" for hourly or custom schedule.
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute
      .toString()
      .padStart(2, '0')}`;

    const users = await Alert.find();

    for (const user of users) {
      const { name, userEmail, medicine, drinksMoreThan6L, sleepTime, createdAt, doctorReminderSent } =
        user;

      // --- Medicine reminders ---
      if (medicine.takesMedicine) {
        if (medicine.times.morning && currentTime === '06:00')
          await sendEmail({ to: userEmail, subject: 'Morning Medicine Reminder', text: `Good morning ${name}! Please take your morning medicine.` });
        if (medicine.times.afternoon && currentTime === '14:00')
          await sendEmail({ to: userEmail, subject: 'Afternoon Medicine Reminder', text: `Hi ${name}, time for your afternoon medicine.` });
        if (medicine.times.evening && currentTime === '20:00')
          await sendEmail({ to: userEmail, subject: 'Evening Medicine Reminder', text: `Good evening ${name}, please take your evening medicine.` });
      }

      // --- Exercise (daily at 6am) ---
      if (currentTime === '06:00')
        await sendEmail({ to: userEmail, subject: 'Morning Exercise', text: `Good morning ${name}! Let’s start the day with a light jog or stretch.` });

      // --- Water reminders (if drinks less than 6L) ---
      if (!drinksMoreThan6L) {
        const waterTimes = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
        if (waterTimes.includes(currentTime))
          await sendEmail({ to: userEmail, subject: 'Hydration Reminder', text: `Hi ${name}, remember to drink some water! Stay hydrated 💧` });
      }

      // --- Sleep reminder ---
      if (currentTime === sleepTime)
        await sendEmail({ to: userEmail, subject: 'Sleep Reminder', text: `Good night ${name}! Time to rest and recharge 🌙` });

      // --- Doctor visit every 4 months ---
      const monthsPassed = (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsPassed >= 4 && !doctorReminderSent) {
        await sendEmail({ to: userEmail, subject: 'Doctor Visit Reminder', text: `Hi ${name}, it's been 4 months since your last checkup. Please consider scheduling a visit to your doctor.` });
        user.doctorReminderSent = true;
        await user.save();
      }
    }
  });
}
