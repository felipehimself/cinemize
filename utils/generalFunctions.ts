export const formatDate = (createdDate: string): string => {
  const [date, time] = createdDate.split('T');
  const formatedData = date.split('-').reverse().join('/');
  const formatedTime = time.split(':').splice(0, 2).join('h');

  return `${formatedData} • ${formatedTime}`;
};
