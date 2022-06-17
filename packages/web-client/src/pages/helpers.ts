import { DateTime } from 'luxon';

export const getDurationAsText = (date: string): string => {
  const dateTime = DateTime.fromISO(date);
  const duration = DateTime.now().diff(dateTime, ['years', 'months', 'days', 'hours', 'minutes']);
  const minutes = Math.floor(duration.minutes);
  let durationString;

  if (duration.years > 0) {
    durationString = `${duration.years} year${duration.years > 1 ? 's' : ''} ago`;
  } else if (duration.months > 0) {
    durationString = `${duration.months} month${duration.months > 1 ? 's' : ''} ago`;
  } else if (duration.days > 0) {
    durationString = `${duration.days} day${duration.days > 1 ? 's' : ''} ago`;
  } else if (duration.hours > 0) {
    durationString = `${duration.hours} hour${duration.hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    durationString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    durationString = 'Less than a minute ago';
  }

  return durationString;
};

export const getLikesTooltip = (likes: string[]): string => {
  const LIKES_LIMIT = 5;
  const likesCount = likes.length;

  if (likesCount === 0) {
    return 'Be the first who liked this post';
  } else if (likesCount <= LIKES_LIMIT) {
    return `${likes.join(', ')} liked this post`;
  } else {
    const shownLikes = likes.slice(0, LIKES_LIMIT);
    const difference = likesCount - LIKES_LIMIT;

    return `${shownLikes.join(', ')} and ${difference} other${
      difference > 1 ? 's' : ''
    } liked this post`;
  }
};
