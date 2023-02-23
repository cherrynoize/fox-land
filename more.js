function toggleCollapse() {
  // switch toggle
  document.getElementById("show-more").classList.toggle("less");

  // toggle menu collapse
  const blocks = document.getElementById("block-menu");
  blocks.classList.toggle("collapsed");

  // toggle single blocks
  for (const block of blocks.children) {
    if (!block.classList.contains("pinned")) {
      block.classList.toggle("hidden");
    }
  }
}
