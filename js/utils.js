// Returns the first letter of a name in uppercase
export function getAvatarLetter(name) {
  return name.trim().charAt(0).toUpperCase();
}

// Returns a shortened version of a full name
export function getShortenName(fullName) {
  
  // Trim whitespace and split into words
  const parts = fullName.trim().split(/\s+/);

  // If only one name is given, return it unchanged
  if (parts.length < 2) {
    return fullName;
  }

  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0].toUpperCase() + ".";

  return `${firstName} ${lastInitial}`;
}
