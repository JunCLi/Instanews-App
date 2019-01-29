(function($) {
$(function(){
  
  const $dropDown = $('.select-category');
  const $header = $('header');
  const $nytLogo = $('.nyt-logo');
  const $mainSection = $('main');

  const minimizeHeader = () => {
    if ($nytLogo.css('align-self') === 'end') {
      $header.animate({
        height: '500'
      }, 'slow');
    } else {
      $header.animate({
        height: '250'
      }, 'slow');
    }
  };

  $dropDown.on('change', (event) => {
    const selectedCategory = $dropDown.val();
    const targetUrl = `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=fas25Dtm8dhqohIpf8HSFFMv5gyzhoAY`

    minimizeHeader();

    $('main').children().remove();
    $('main').append('<ul></ul>');

    $.ajax({
      method: 'GET',
      url: targetUrl,
    })
    .done(data => {
      const articles = data.results;
      let articleCounter = 0;
      articles.forEach(article => {
        if (article.multimedia.length !== 0 && articleCounter < 12) {
          articleCounter++;
          $('main ul').append(`<li><a></a></li>`);
          $(`main ul li:nth-child(${articleCounter})`).css('backgroundImage', `url(${article.multimedia[4].url})`)
        }
      })

      
      
    });
  });
});
})(jQuery);