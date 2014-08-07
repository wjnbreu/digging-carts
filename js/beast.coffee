$ ->

	composerObject = {}
	videoObject = {}
	
	player = {}
	anchorElements = {}

	hoverSound = new Howl {
		urls: ['sound/CLICK.mp3', 'sound/CLICK.ogg']
		volume: 0.5
	}

	clickSound = new Howl {
		urls: ['sound/EXIT.mp3', 'sound/EXIT.ogg']
		volume: 0.7
	}



	getData = ->
		client = contentful.createClient
			accessToken: '38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0'
			space: 's9bc5ah7p1d5'


		client.entries({'content_type': '42CpXYSUms44OskS6wUU6I', 'include': 1}).done (data) ->
			composerObject = data
			addComposers(composerObject)
		
		client.entries({'content_type':'36SuQSSPR6QmWOk8CseMC6', 'include': 1}).done (data) ->
			videoObject = data
			
			$('a.episode').bind 'click', ->
				order = $(@).data 'order'
				changeVideo(order, videoObject)
		
		init()


	saveComposer = (composer) ->
		composerObject = composer

	init = ->
		setupYouTube()
		setupBinds()
		$('h1.colors').fitText(0.7)
		setInterval(colorCycle, 250)
		removeSpinner()
		

	


	colorCycle = ->
		colors = ['#d6f7fe', '#312cc0', '#f9a205', '#d89e46', '#4c9d5b', '#fbdd1b', '#ff6dd1']
		ranColor = Math.floor(Math.random() * colors.length)
		$('h1.colors').css
			color: colors[ranColor]


	removeSpinner = ->
		$('.spinner').fadeOut()
		
		
	setupYouTube = ->
		tag = document.createElement('script')
		tag.src = "https://www.youtube.com/iframe_api"
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)


	window.onYouTubeIframeAPIReady = ->
		player = new YT.Player 'player',
			height: '390'
			width: '640'
			videoId: 'yqXayqIrAYE'
			events: {
				"onReady": onPlayerReady
			}
			playerVars: {
				modestbranding: 1
				controls: 1
				showinfo: 0
				hd: 1

			}

	onPlayerReady = (event) ->
		resizeVid()
		

	setupBinds = ->
		$('nav').bind 'mouseenter', ->
			$(@).transition
				left: 0
			, 200

		$('a').bind 'click', ->
			clickSound.play()
		
		$('a').bind 'mouseenter', ->
			hoverSound.play()

		$('nav').bind 'mouseleave', ->
			$(@).transition
				left: '-100px'
			, 200
		
		

		
		$('a.composer').bind 'click',(event) ->
			event.preventDefault()
			scrollTo = $(@).attr('href')

			scrollWrap = $('.composer-data').offset().top

			scrollToPos = $(".artist #{scrollTo}").position().top

			$('.composer-data').transition
				left: 0
			,300, ->
				$('.data-container').animate
					scrollTop: scrollToPos
				, 200

		$('a.exit').bind 'click', (event) ->
			event.preventDefault()
			$('.composer-data').transition
				left: '100%'
			,200


		$('a.scroll').bind 'click', (event) ->
			link = $(@)
			smoothScroll(event, link)

			
	sendScore = ->
		scoreFactor = Math.floor(Math.random() * -1000)
		points = ($('.hero').position().top * scoreFactor)
		if points >= $('.score').find('h2 span').text()

			$('.score').find('h2 span').empty().text(points)


	changeVideo = (order, videoObject) ->
		console.log videoObject
		video = videoObject[order - 1].fields
		player.cueVideoById(video.ytVideoId)
		$('.videos h1').empty().text video.ytVideoId
		$('.videos p.body').empty().text video.videoDescription
		$('.videos p.body').slideDown()

	addComposers = (object) ->
		console.log composerObject
		composers = $('.composer-nav ul li')
		composers.each (index) ->
			t = $(@)
			#account for zero indexing
			person = composerObject[index].fields
			name = person.composerName
			t.text(name)
			t.parent().attr("href", "##{person.firstNameInLowercase}")
			imgId = person.image.sys.id
			img = "//images.contentful.com/s9bc5ah7p1d5/54GVDo7wj6ciwaeCMGoGKI/e8137bb3537549c4114200d062dc921e/akio-dobashi.jpg"
			composerData = "<a id='#{person.firstNameInLowercase}'><img src='#{img}'/><h1>#{person.composerName}</h1><p>#{person.bio}</p>"
			$(".composer-data .artist:nth-child(#{index+1})").append composerData



	resizeVid = ->
		winWidth = $(window).width()
		vidWidth = winWidth / 1.5
		ogWidth = $('#player').attr('width')
		ogHeight = $('#player').attr('height')
		ratio = ogWidth / ogHeight

		$('#player').attr('width', vidWidth)
		$('#player').attr('height', vidWidth / ratio)

		diff = winWidth - vidWidth
		margin = diff / 2
		$('#player').css
			marginLeft: margin

	smoothScroll = (event, link) ->
		event.preventDefault()
		scrollTo = link.attr 'href'

		location = $("#{scrollTo}").position().top

		if link.hasClass "active"
			return
		else
			$('nav ul a').each ->
				$(@).removeClass "active"

			link.addClass "active"

			$('body,html').animate
				scrollTop: location
			, 300


	getData()


	
		
	