(function($) {
$(function(){
  
  const $dropDown = $('.select-category');
  
  $dropDown.on('change', (event) => {
    const selectedCategory = $dropDown.val();
    const targetUrl = `https://api.nytimes.com/svc/topstories/v2/${selectedCategory}.json?api-key=fas25Dtm8dhqohIpf8HSFFMv5gyzhoAY`

    $('main').append('<ul></ul>');


    $.ajax({
      method: 'GET',
      url: targetUrl,
    })
    .done(data => {
      console.log(data);
      console.log(data.results[1].multimedia[4].url);
      const articles = data.results;
      let articleCounter = 0;
      articles.forEach(article => {
        if (article.multimedia.length !== 0 && articleCounter < 12) {
          articleCounter++;
          $('main ul').append(`<li><a></a></li>`);
          $(`main ul li:nth-child(${articleCounter})`).css('backgroundImage', `url(${article.multimedia[4].url})`)

          console.log(article.multimedia[4].url)
        } 
      })
    });

  });
  

});
})(jQuery);