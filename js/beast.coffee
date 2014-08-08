$ ->

	composerObject = {}
	videoObject = {}
	mixObject = {}
	player = {}
	anchorElements = {}
	colors = ['#d6f7fe', '#312cc0', '#f9a205', '#d89e46', '#4c9d5b', '#fbdd1b', '#ff6dd1']

	#SOUNDZ
	hoverSound = new Howl {
		urls: ['sound/CLICK.mp3', 'sound/CLICK.ogg']
		volume: 0.5
	}

	clickSound = new Howl {
		urls: ['sound/EXIT.mp3', 'sound/EXIT.ogg']
		volume: 0.7
	}

	


	init = ->
		setupYouTube()
		setupBinds()
		$('h1.colors').fitText(0.7)
		setInterval(colorCycle, 250)
		removeSpinner()
		

	


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
				modestbranding: true
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
		
		$('a.composer-title').bind 'click',(event) ->
			event.preventDefault()
			goToComposers()

		$('a.exit').bind 'click', (event) ->
			event.preventDefault()
			$('.composer-data').fadeOut(100, ->
				location = $("#composers").offset().top
				$('body,html').animate
					scrollTop: location
				,50
			)

		$('a.scroll').bind 'click', (event) ->
			link = $(@)
			smoothScroll(event, link)

		
	colorCycle = ->
		ranColor = Math.floor(Math.random() * colors.length)
		# $('.composers').css
		# 	backgroundColor: colors[ranColor]
		$('h1.colors').css
			color: colors[ranColor]


	#FIXXXXXX!!!!!!
	goToComposers = (item) ->
		#change bg
		ranColor = Math.floor(Math.random() * colors.length)
		# $('.composer-data').css
		# 	backgroundColor: colors[ranColor]

		$('.composer-data').fadeIn()



	changeVideo = (order, videoObject) ->
		
		#account for zero index
		video = videoObject[order - 1].fields
		player.cueVideoById(video.ytVideoId)
		$('.videos h1').empty().text video.episodeTitle
		$('.videos p.body').empty().text video.videoDescription
		$('.videos p.body').slideDown()

	

	addComposers = (object) ->
		for composer in object
			person = composer.fields
			name = person.composerName
			img = person.image.fields.file.url
			composerData = "<div class='artist'><a id='#{person.firstNameInLowercase}'><img src='#{img}'/><h1>#{person.composerName}</h1><p>#{person.bio}</p></div>"
			$(".composer-data .data-container").append composerData
		


	addMixes = (object) ->
		for mix in object
			mixInfo = mix.fields
			name = mixInfo.artistName
			embed = mixInfo.rbmaRadioEmbedCode
			description = mixInfo.descriptions
			img = mixInfo.artistImage.fields.file.url
			mixData = "<div class='show'><img src='#{img}'/>#{embed}<p>#{description}</p></div>"
			$('.radio').append(mixData)

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

	

	smoothScroll = (event, link, attr) ->
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



	removeSpinner = ->
		$('.spinner').fadeOut()
		


	getData = ->
		client = contentful.createClient
			accessToken: '38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0'
			space: 's9bc5ah7p1d5'

		client.entries({'content_type': '42CpXYSUms44OskS6wUU6I', 'include': 1}).done (data) ->
			addComposers(data)
		
		client.entries({'content_type':'36SuQSSPR6QmWOk8CseMC6', 'include': 1}).done (data) ->
			videoObject = data

		client.entries({'content_type':'2YpXtnGW80EEGgCUsSMmCc', 'include': 1}).done (data) ->
			addMixes(data)

		
			
			$('a.episode').bind 'click', ->
				$(@).parent().find('li').removeClass "active"
				$(@).find('li').addClass "active"
				order = $(@).data 'order'
				changeVideo(order, videoObject)
		
		#launch when ready
		init()


	getData()


	
		
	