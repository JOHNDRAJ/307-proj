function formatTimestamp(timestamp) {
  try {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    const time = new Intl.DateTimeFormat("en-US", options).format(date);

    if (isToday) {
      return `Today ${time.toLowerCase()}`;
    } else if (isYesterday) {
      return `Yesterday ${time.toLowerCase()}`;
    } else {
      // Day of the week + time
      const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        date,
      );
      return `${day} ${time.toLowerCase()}`;
    }
  } catch (error) {
    return "err";
  }
}
function removeName(namesString, nameToRemove) {
  if (namesString.includes(nameToRemove)) {
    const namesArray = namesString.split(", ");
    const filteredNames = namesArray.filter(
      (name) => name.toLowerCase() !== nameToRemove.toLowerCase(),
    );
    return filteredNames.join(", ");
  }
  return namesString;
}

export { formatTimestamp, removeName };
