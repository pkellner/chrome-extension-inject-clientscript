{
  // Use a block statement to prevent modifying global scope
  let version = 98765;
  const event = new CustomEvent("jquery-version", { detail: version });
  document.dispatchEvent(event);
}
