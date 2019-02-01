(function($) {
$(function(){
  
  const $dropDown = $('.select-category');
  const $header = $('header');
  const $nytLogo = $('.nyt-logo');
  const $mainSection = $('main');

  // function will shrink header depending on screen size
  const minimizeHeader = () => {
    // mobile screen size the logo has css 'align-self: end' property
    if ($nytLogo.css('align-self') === 'end') {
      $header.addClass('shrink-header');
    } else {
      $header.addClass('shrink-header');
    }
  };

  // function will create dynamic font size depnding on width of the article
  const resizeFontSize = () => {
    const $articleCell = $mainSection.find('li');
    let fontSize = $articleCell.width() * 0.05;
    if ($articleCell.height() ===  $articleCell.width()) {
      fontSize = $articleCell.width() * 0.04;
    }
    $mainSection.css('font-size', fontSize);
  };

  // if window size changes, adjust font size
  $(window).on('resize', () => {
    resizeFontSize();
  });

  $dropDown.on('change', () => {
    const selectedCategory = $dropDown.val();
    const targetUrl = `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=fas25Dtm8dhqohIpf8HSFFMv5gyzhoAY`
    $.ajax({
      method: 'GET',
      url: targetUrl
    })
    .done(data => {
      
      // function will clear old articles or loading gif
      const clearMain = () => {
        $mainSection.empty();
      }

      // function to add gif to indicate loading... 
      const loaderGif = () => {
        clearMain();
        $mainSection.prepend('<img class="loading-gif" src="images/ajax-loader.gif">')
      }

      // function append articles
      const displayArticles = (data) => {
        clearMain();
        $mainSection.append('<ul></ul>');
        const articles = data.results;
        let articleCounter = 0;
        articles.forEach(article => {
          if (article.multimedia.length !== 0 && articleCounter < 12) {
            // counter because index does not account for skipped articles that don't have an image
            articleCounter++;
            $('main ul').append(`<li><a href=${article.url}><p>${article.abstract}</p></a></li>`);
            $(`main ul li:nth-child(${articleCounter})`).css('backgroundImage', `url(${article.multimedia[4].url})`)
          }
        })
        // adjust font size as appropriate
        resizeFontSize();
      };

      minimizeHeader();
      loaderGif();
      // delay to show loading gif
      setTimeout(displayArticles, 1000, data);
    });
  });
});
})(jQuery);