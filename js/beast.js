// Generated by CoffeeScript 1.7.1
$(function() {
  var addComposers, addMixes, addVideoTitles, additionalVideoObject, anchorElements, changeAdditionalVideo, changeVideo, clickSound, colorCycle, colors, composerObject, getData, getHeight, goToComposers, hoverSound, init, initCount, magazineObject, mixObject, onPlayerReady1, onPlayerReady2, player1, player2, prepInit, removeSpinner, resizeVid, sendHeight, setupBinds, setupYouTube, smoothScroll, videoObject;
  composerObject = {};
  videoObject = {};
  mixObject = {};
  additionalVideoObject = {};
  magazineObject = {};
  player1 = {};
  player2 = {};
  anchorElements = {};
  colors = ['#d6f7fe', '#312cc0', '#f9a205', '#d89e46', '#4c9d5b', '#fbdd1b', '#ff6dd1'];
  hoverSound = new Howl({
    urls: ['sound/CLICK.mp3', 'sound/CLICK.ogg'],
    volume: 0.5
  });
  clickSound = new Howl({
    urls: ['sound/EXIT.mp3', 'sound/EXIT.ogg'],
    volume: 0.7
  });
  initCount = 0;
  init = function() {
    setupYouTube();
    setupBinds();
    $('h1.colors').fitText(0.7);
    setInterval(colorCycle, 250);
    $('.video-nav ul a.episode li').first().addClass("active");
    $('.story-nav ul a.additional-episode li').first().addClass("active");
    setTimeout(sendHeight(getHeight()), 500);
    return removeSpinner();
  };
  prepInit = function(count) {
    initCount = initCount + count;
    if (initCount === 4) {
      return init();
    }
  };
  sendHeight = function(height) {
    var message, messageJSON;
    message = {
      height: height
    };
    messageJSON = JSON.stringify(message);
    return window.parent.postMessage(messageJSON, '*');
  };
  getHeight = function() {
    return $(document.body).height() + 300;
  };
  setupYouTube = function() {
    var firstScriptTag, tag;
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    return firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };
  window.onYouTubeIframeAPIReady = function() {
    player1 = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'WYSupJ5r2zo',
      events: {
        "onReady": onPlayerReady1
      },
      playerVars: {
        modestbranding: true,
        controls: 1,
        showinfo: 0,
        hd: 1
      }
    });
    return player2 = new YT.Player('storyplayer', {
      height: '390',
      width: '640',
      videoId: 'VsbG4pXrhr8',
      events: {
        "onReady": onPlayerReady2
      },
      playerVars: {
        modestbranding: true,
        controls: 1,
        showinfo: 0,
        hd: 1
      }
    });
  };
  onPlayerReady1 = function(event) {
    resizeVid('#player');
    return sendHeight(getHeight());
  };
  onPlayerReady2 = function(event) {
    resizeVid('#storyplayer');
    return sendHeight(getHeight());
  };
  setupBinds = function() {
    $('nav').bind('mouseenter', function() {
      return $(this).transition({
        left: 0
      }, 200);
    });
    $('a').bind('click', function() {
      return clickSound.play();
    });
    $('a').bind('mouseenter', function() {
      return hoverSound.play();
    });
    $('nav').bind('mouseleave', function() {
      return $(this).transition({
        left: '-100px'
      }, 200);
    });
    $('a.scroll').bind('click', function(event) {
      var link;
      link = $(this);
      return smoothScroll(event, link);
    });
    return window.addEventListener('resize', function() {
      resizeVid('#player');
      resizeVid('#storyplayer');
      return sendHeight(getHeight());
    });
  };
  colorCycle = function() {
    var ranColor;
    ranColor = Math.floor(Math.random() * colors.length);
    return $('h1.colors').css({
      color: colors[ranColor]
    });
  };
  goToComposers = function(item) {
    $('.composer-data').fadeIn();
    $('body,html').animate({
      scrollTop: 0
    }, 50);
    return sendHeight(getHeight());
  };
  changeVideo = function(order, videoObject) {
    var video;
    video = videoObject[order].fields;
    player1.cueVideoById(video.ytVideoId);
    $('.videos h1').empty().text(video.episodeTitle);
    $('.videos p.body').empty().text(video.videoDescription);
    $('.videos p.body').slideDown();
    return sendHeight(getHeight());
  };
  changeAdditionalVideo = function(order, additionalVideoObject) {
    var video;
    video = additionalVideoObject[order].fields;
    player2.cueVideoById(video.additionalYouTube);
    $('.stories h1').empty().text(video.additionalVideoTitle);
    $('.stories p.body').empty().text(video.description);
    $('.stories p.body').slideDown();
    return sendHeight(getHeight());
  };
  addVideoTitles = function(object, target, type) {
    var episode, i, video, _i, _j, _len, _len1, _results, _results1;
    if (type === 'main') {
      _results = [];
      for (i = _i = 0, _len = object.length; _i < _len; i = ++_i) {
        video = object[i];
        episode = video.fields.episodeNumber;
        _results.push(target.append("<a class='episode' href='#episode' data-order=" + i + "><li>" + episode + "</li>"));
      }
      return _results;
    } else if (type === 'additional') {
      _results1 = [];
      for (i = _j = 0, _len1 = object.length; _j < _len1; i = ++_j) {
        video = object[i];
        episode = video.fields.additionalVideoTitle;
        _results1.push(target.append("<a class='additional-episode' href='#additional-episode' data-order=" + i + "><li>" + episode + "</li>"));
      }
      return _results1;
    }
  };
  addComposers = function(object) {
    var composer, composerData, img, name, person, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = object.length; _i < _len; _i++) {
      composer = object[_i];
      person = composer.fields;
      name = person.composerName;
      img = person.image.fields.file.url;
      composerData = "<div class='artist'><img src='" + img + "'/><h1>" + person.composerName + "</h1><p>" + person.bio + "</p></div>";
      _results.push($(".data-container").append(composerData));
    }
    return _results;
  };
  addMixes = function(object) {
    var description, embed, img, mix, mixData, mixInfo, name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = object.length; _i < _len; _i++) {
      mix = object[_i];
      mixInfo = mix.fields;
      name = mixInfo.artistName;
      embed = mixInfo.rbmaRadioEmbedCode;
      description = mixInfo.descriptions;
      img = mixInfo.artistImage.fields.file.url;
      mixData = "<div class='show'><img src='" + img + "'/>" + embed + "<p>" + description + "</p></div>";
      $('.radio').append(mixData);
      _results.push(sendHeight(getHeight()));
    }
    return _results;
  };
  resizeVid = function(vidPlayer) {
    var diff, margin, ogHeight, ogWidth, player, ratio, vidWidth, winWidth;
    player = $(vidPlayer);
    winWidth = $(window).width();
    vidWidth = winWidth / 1.5;
    ogWidth = player.attr('width');
    ogHeight = player.attr('height');
    ratio = ogWidth / ogHeight;
    player.attr('width', vidWidth);
    player.attr('height', vidWidth / ratio);
    diff = winWidth - vidWidth;
    margin = diff / 2;
    player.css({
      marginLeft: margin
    });
    return sendHeight(getHeight());
  };
  smoothScroll = function(event, link, attr) {
    var location, scrollTo;
    event.preventDefault();
    scrollTo = link.attr('href');
    location = $("" + scrollTo).position().top;
    if (link.hasClass("active")) {

    } else {
      $('nav ul a').each(function() {
        return $(this).removeClass("active");
      });
      link.addClass("active");
      return $('body,html').animate({
        scrollTop: location
      }, 300);
    }
  };
  removeSpinner = function() {
    $('.spinner').remove();
    return sendHeight(getHeight());
  };
  getData = function() {
    var client;
    client = contentful.createClient({
      accessToken: '38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0',
      space: 's9bc5ah7p1d5'
    });
    client.entries({
      'content_type': '42CpXYSUms44OskS6wUU6I',
      'include': 1
    }).done(function(data) {
      addComposers(data);
      return prepInit(1);
    });
    client.entries({
      'content_type': '36SuQSSPR6QmWOk8CseMC6',
      'include': 1,
      'order': 'fields.order'
    }).done(function(data) {
      videoObject = data;
      prepInit(1);
      addVideoTitles(videoObject, $('.video-nav ul'), 'main');
      return $('a.episode').bind('click', function(event) {
        var order;
        event.preventDefault();
        $(this).parent().find('li').removeClass("active");
        $(this).find('li').addClass("active");
        order = $(this).data('order');
        return changeVideo(order, videoObject);
      });
    });
    client.entries({
      'content_type': '2YpXtnGW80EEGgCUsSMmCc',
      'include': 1
    }).done(function(data) {
      prepInit(1);
      return addMixes(data);
    });
    return client.entries({
      'content_type': '6fwxAcXrxK4yqyaMUiWwWY',
      'include': 1,
      'order': 'fields.order'
    }).done(function(data) {
      prepInit(1);
      additionalVideoObject = data;
      addVideoTitles(additionalVideoObject, $('.story-nav ul'), 'additional');
      return $('a.additional-episode').bind('click', function(event) {
        var order;
        event.preventDefault();
        $(this).parent().find('li').removeClass("active");
        $(this).find('li').addClass("active");
        order = $(this).data('order');
        return changeAdditionalVideo(order, additionalVideoObject);
      });
    });
  };
  getData();
  return window.addEventListener('load', sendHeight(getHeight()));
});
