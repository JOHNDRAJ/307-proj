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
      return `Today ${time}`;
    } else if (isYesterday) {
      return `Yesterday ${time}`;
    } else {
      // Day of the week + time
      const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        date
      );
      return `${day} ${time}`;
    }
  } catch (error) {
    return "err";
  }
}
function removeName(namesString, nameToRemove) {
  if (namesString.includes(nameToRemove)) {
    const namesArray = namesString.split(", ");
    const filteredNames = namesArray.filter(
      (name) => name.toLowerCase() !== nameToRemove.toLowerCase()
    );
    return filteredNames.join(", ");
  }
  return namesString;
}

function formatLastTimestamp(timestamp) {
  try {
    const now = new Date();
    const date = new Date(timestamp);
    console.log("Date:", date);
    let diff = now - date;
    console.log("Diff:", diff);

    // Timestamps within in the past hour
    diff = diff / (1000 * 60);
    if (diff < 1) {
      console.log("Now");
      return "Now";
    } else if (diff < 60) {
      console.log("Past hr");
      return `${Math.floor(diff)} min`;
    }

    // Timestamps within the past day
    diff /= 60;
    if (diff < 24) {
      console.log("Past day");
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Timestamps within the past week
    diff /= 24;
    if (diff < 7) {
      console.log("Past week");
      return date.toLocaleDateString("en-US", {
        weekday: "short",
      });
    }

    // Timestamps within the past year
    diff /= 7;
    if (diff < 52) {
      console.log("past year");
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  } catch {
    return "err";
  }
}

export { formatTimestamp, removeName, formatLastTimestamp };
