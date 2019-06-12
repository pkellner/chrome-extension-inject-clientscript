{
  // Use a block statement to prevent modifying global scope
  let version = -1;
  if ($ && $.fn && $.fn.jquery) {
    version = $.fn.jquery;
  }

  const event = new CustomEvent("jquery-version", { detail: version });
  document.dispatchEvent(event);
}
