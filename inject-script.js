{
  // Use a block statement to prevent modifying global scope

  debugger;
  let version = -1;
  if (jQuery && jQuery.fn && jQuery.fn.jquery) {
    version = jQuery.fn.jquery;
  }

  window.postMessage(
    {
      type: "FROM_PAGE",
      version
    },
    "*"
  );
}
