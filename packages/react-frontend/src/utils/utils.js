function formatTimestamp(date, showMins) {
  const now = new Date();
  const diff = now - date; // Difference in milliseconds
  const diffMins = diff / (1000 * 60);
  const diffHours = diffMins / 60;
  const diffDays = diffHours / 24;
  const diffWeeks = diffDays / 7;

  // Show mins for sidebar timestamps, skip to hours for channel timestamps
  if (showMins && diffMins < 1) {
    return "Now";
  }
  if (showMins && diffMins < 60) {
    return `${Math.floor(diffMins)} min`;
  }
  if (diffHours < 24) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  }
  if (diffWeeks < 52) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US");
}

export default formatTimestamp;
