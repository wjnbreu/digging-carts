$ ->

	composerObject = {}
	videoObject = {}
	mixObject = {}
	additionalVideoObject = {}
	player1 = {}
	player2 = {}
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

	initCount = 0


	init = ->
		setupYouTube()
		setupBinds()
		$('h1.colors').fitText(0.7)
		setInterval(colorCycle, 250)
		$('.video-nav ul a.episode li').first().addClass "active"
		$('.story-nav ul a.additional-episode li').first().addClass "active"
		removeSpinner()
		sendHeight(getHeight())
		

	prepInit = (count) ->
		initCount = initCount + count
		if initCount == 4
			init()

	sendHeight = (height) ->
		message = {height: height}
		messageJSON = JSON.stringify(message)
		return window.parent.postMessage(messageJSON, '*')

	getHeight = ->
		return $(document.body).height()

	setupYouTube = ->
		tag = document.createElement('script')
		tag.src = "https://www.youtube.com/iframe_api"
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

	

	window.onYouTubeIframeAPIReady = ->
		player1 = new YT.Player 'player',
			height: '390'
			width: '640'
			videoId: 'WYSupJ5r2zo'
			events: {
				"onReady": onPlayerReady1
			}
			playerVars: {
				modestbranding: true
				controls: 1
				showinfo: 0
				hd: 1

			}
		
		player2 = new YT.Player 'storyplayer',
			height: '390'
			width: '640'
			videoId: 'VsbG4pXrhr8'
			events: {
				"onReady": onPlayerReady2
			}
			playerVars: {
				modestbranding: true
				controls: 1
				showinfo: 0
				hd: 1
			}

	

	onPlayerReady1 = (event) ->
		resizeVid('#player')

	onPlayerReady2 = (event) ->
		resizeVid('#storyplayer')
		

	draw = ->
		for icon in iconCount
			ctx.drawImage(fallingIcons[i].image, fallingIcons[i].x, fallingIcons[i].y )
			fallingIcons[i].y += fallingIcons[i].speed
			if fallingIcons[i].y > 450
				fallingIcons[i].y = -25
				fallingIcons[i].x = Math.random() * 600

	
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

		$(window).bind 'resize', (event) ->
			resizeVid('#player')
			resizeVid('#storyplayer')

		#resize
		window.addEventListener 'resize', ->
			sendHeight(getHeight())

		
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
		video = videoObject[order].fields
		player1.cueVideoById(video.ytVideoId)
		$('.videos h1').empty().text video.episodeTitle
		$('.videos p.body').empty().text video.videoDescription
		$('.videos p.body').slideDown()


	changeAdditionalVideo = (order, additionalVideoObject) ->
		#account for zero index
		console.log additionalVideoObject
		video = additionalVideoObject[order].fields
		player2.cueVideoById(video.additionalYouTube)
		$('.stories h1').empty().text video.additionalVideoTitle
		$('.stories p.body').empty().text video.description
		$('.stories p.body').slideDown()




	addVideoTitles = (object, target, type) ->
		
		if type == 'main'
			for video, i in object
				episode = video.fields.episodeNumber
				target.append("<a class='episode' href='#episode' data-order=#{i}><li>#{episode}</li>")
		
		else if type == 'additional'
			for video, i in object
				episode = video.fields.additionalVideoTitle
				target.append("<a class='additional-episode' href='#additional-episode' data-order=#{i}><li>#{episode}</li>")

	

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

	resizeVid = (vidPlayer) ->
		player = $(vidPlayer)
		winWidth = $(window).width()
		vidWidth = winWidth / 1.5
		ogWidth = player.attr('width')
		ogHeight = player.attr('height')
		ratio = ogWidth / ogHeight

		player.attr('width', vidWidth)
		player.attr('height', vidWidth / ratio)

		diff = winWidth - vidWidth
		margin = diff / 2
		player.css
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
		$('.spinner').remove()
		


	getData = ->
		client = contentful.createClient
			accessToken: '38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0'
			space: 's9bc5ah7p1d5'

		#COMPOSERS
		client.entries({'content_type': '42CpXYSUms44OskS6wUU6I', 'include': 1}).done (data) ->
			addComposers(data)
			prepInit(1)
		
		#MAIN YT VIDS
		client.entries({'content_type':'36SuQSSPR6QmWOk8CseMC6', 'include': 1, 'order': 'fields.order'}).done (data) ->
			videoObject = data
			prepInit(1)
			addVideoTitles(videoObject, $('.video-nav ul'), 'main')

			$('a.episode').bind 'click', (event) ->
				event.preventDefault()
				$(@).parent().find('li').removeClass "active"
				$(@).find('li').addClass "active"
				order = $(@).data 'order'
				changeVideo(order, videoObject)

		#RADIO
		client.entries({'content_type':'2YpXtnGW80EEGgCUsSMmCc', 'include': 1}).done (data) ->
			prepInit(1)
			addMixes(data)

		#ADDITIONAL YOUTUBE VIDS
		client.entries({'content_type':'6fwxAcXrxK4yqyaMUiWwWY', 'include': 1, 'order': 'fields.order'}).done (data) ->
			prepInit(1)
			additionalVideoObject = data
			addVideoTitles(additionalVideoObject, $('.story-nav ul'), 'additional')

			$('a.additional-episode').bind 'click', (event) ->
				event.preventDefault()
				$(@).parent().find('li').removeClass "active"
				$(@).find('li').addClass "active"
				order = $(@).data 'order'
				changeAdditionalVideo(order, additionalVideoObject)

		


		
	#launch when ready	
	getData()


	


	
		
	