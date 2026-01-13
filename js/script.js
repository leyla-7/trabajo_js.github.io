(function () {
  if (!window.jQuery) return;

  $(function () {
    const $thumbs = $('#thumbnails');
    const $main = $('#main-image');

    if ($thumbs.length === 0 || $main.length === 0) return;

    let images = [
      "../images/img1.png",
      "../images/img2.png",
      "../images/img3.png",
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2"
    ];

    let currentIndex = 0;

    images.forEach((src, index) => {
      $thumbs.append(`<img src="${src}" data-index="${index}" alt="thumb ${index + 1}">`);
    });

    function showImage(index) {
      currentIndex = index;
      $main.attr("src", images[currentIndex]);
      $("#thumbnails img").removeClass("active");
      $(`#thumbnails img[data-index=${currentIndex}]`).addClass("active");
    }

    showImage(0);

    $("#thumbnails").on("click", "img", function () {
      let index = $(this).data("index");
      showImage(index);
    });

    $(".next").click(function () {
      let nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    });

    $(".prev").click(function () {
      let prevIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(prevIndex);
    });
  });
})();
