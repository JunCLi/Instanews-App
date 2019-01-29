(function($) {
$(function(){
  
  const $dropDown = $('.select-category');
  const $header = $('header');
  const $nytLogo = $('.nyt-logo');
  const $mainSection = $('main');

  resizeFontSize = () => {
    const fontSize = $mainSection.find('li').width() * 0.06;
    $mainSection.css('font-size', fontSize);
  };

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

  const keepHeaderConsistent = () => {
    if ($nytLogo.css('align-self') === 'end' && $mainSection.find('li').length > 0) {
      $header.css('height', '500');
    } else if ($nytLogo.css('align-self') === 'center' && $mainSection.find('li').length > 0) {
      $header.css('height', '250');
    }
  };

  $(window).on('resize', () => {
    keepHeaderConsistent();
    resizeFontSize();
  });

  $dropDown.on('change', (event) => {
    const selectedCategory = $dropDown.val();
    const targetUrl = `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=fas25Dtm8dhqohIpf8HSFFMv5gyzhoAY`
    $.ajax({
      method: 'GET',
      url: targetUrl,
      success: () => {
        
      }
    })
    .done(data => {
      

      const clearMain = () => {
        $mainSection.children().remove();
      }

      const loaderGif = () => {
        clearMain();
        $mainSection.prepend('<img class="loading-gif" src="images/ajax-loader.gif">')
      }

      const displayArticles = (data) => {
        clearMain();
        $mainSection.append('<ul></ul>');
        const articles = data.results;
        let articleCounter = 0;
        articles.forEach(article => {
          if (article.multimedia.length !== 0 && articleCounter < 12) {
            articleCounter++;
            $('main ul').append(`<li><a href=${article.url}><p>${article.abstract}</p></a></li>`);
            $(`main ul li:nth-child(${articleCounter})`).css('backgroundImage', `url(${article.multimedia[4].url})`)
          }
        })
        resizeFontSize();
      };

      minimizeHeader();
      loaderGif();
      setTimeout(displayArticles, 1000, data);
    });
  });
});
})(jQuery);