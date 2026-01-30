export const getBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'badge badge-success';
    case 'medium':
      return 'badge badge-warning';
    case 'hard':
      return 'badge badge-error';
    default:
      return 'badge badge-ghost';
  }
};
