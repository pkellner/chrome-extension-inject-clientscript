{
  // Use a block statement to prevent modifying global scope
  let version = -1;
  if ($ && $.fn && $.fn.jquery) {
    version = $.fn.jquery;
  }

  const length = __NEXT_DATA__ ? JSON.stringify(__NEXT_DATA__).length : 0;

  const event = new CustomEvent("jquery-version", { detail: version + ' length:' + length });
  document.dispatchEvent(event);
}
