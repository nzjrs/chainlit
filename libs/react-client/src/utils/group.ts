import { IThread } from 'src/types';

// Last activity time: time of the last message, falling back to thread
// creation time for threads without messages.
export const lastActivity = (thread: IThread) =>
  new Date(thread.updatedAt ?? thread.createdAt);

export const groupByDate = (data: IThread[]) => {
  const groupedData: { [key: string]: IThread[] } = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  [...data]
    .sort((a, b) => lastActivity(b).getTime() - lastActivity(a).getTime())
    .forEach((item) => {
      const threadDate = lastActivity(item);
      threadDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - threadDate.getTime()) / 86400000
      );
      const locale = navigator.language;

      let category: string;
      if (daysDiff === 0) {
        category = 'Today';
      } else if (daysDiff === 1) {
        category = 'Yesterday';
      } else if (daysDiff <= 7) {
        category = 'Previous 7 days';
      } else if (daysDiff <= 30) {
        category = 'Previous 30 days';
      } else {
        category = threadDate.toLocaleString(locale, {
          month: 'long',
          year: 'numeric'
        });
      }

      groupedData[category] ??= [];
      groupedData[category].push(item);
    });

  return groupedData;
};
