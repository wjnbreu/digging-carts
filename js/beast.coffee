$ ->

	dataObject = {}
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

	# $('.hero').waypoint ->
	# 	$('.content').stop().animate
	# 		backgroundColor: 'black'
	# 	,500

	# $('#videos').waypoint ->
	# 	$('.content').stop().animate
	# 		backgroundColor: 'black'
	# 	,500

	# # $('#composers').waypoint ->
	# # 	$('.content').stop().animate
	# # 		backgroundColor: 'blue'
	# # 	,500

	# $('#radio').waypoint ->
	# 	$('.content').stop().animate
	# 		backgroundColor: 'black'
	# 	, 500
	# 	$('.content').css
	# 		background: 'url(img/falling-sky.gif) repeat top left'

	getData = ->
		$.ajax 'data/data.json',
			type: 'GET'
			error: (jqXHR, textStatus, errorThrown) ->
				console.log "AJAX Error: #{textStatus}"
			success: (data, textStatus, jqXHR) ->
				dataObject = data
				init()
	
	init = ->
		setupYouTube()
		setupBinds()
		addComposers()
		$('h1.colors').fitText(0.7)
		setInterval(colorCycle, 250)

	colorCycle = ->
		colors = ['#d6f7fe', '#312cc0', '#f9a205', '#d89e46', '#4c9d5b', '#fbdd1b', '#ff6dd1']
		ranColor = Math.floor(Math.random() * colors.length)
		$('h1.colors').css
			color: colors[ranColor]



		
		
	setupYouTube = ->
		tag = document.createElement('script')
		tag.src = "https://www.youtube.com/iframe_api"
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)


	window.onYouTubeIframeAPIReady = ->
		player = new YT.Player 'player',
			height: '390'
			width: '640'
			videoId: 'FuLTIi7CyOk'
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
		
		$('a.episode').bind 'click', ->
			order = $(@).data 'order'
			changeVideo(order)

		$('.composer-title').bind 'click', ->
			$(@).parent().find('.composer-nav').slideToggle()
		
		$('a.composer').bind 'click',(event) ->
			event.preventDefault()
			$('.composer-data').transition
				left: 0
			,200
			# if $(@).find('li').hasClass "active"
			# 	$('.composer-data').slideUp()
			# 	$(@).find('li').removeClass "active"
			# else
			# 	$('.composer-data').each ->
			# 		$(@).slideUp()
			# 		$('a.composer').find('li').removeClass "active"
			# 	$(@).find('.composer-data').slideToggle()
			# 	$(@).find('li').toggleClass 'active'

			# 	location = $("#composers").offset().top + 100
			# 	$('body,html').animate
			# 		scrollTop: location
			# 	, 500

		$('a.scroll').bind 'click', (event) ->
			link = $(@)
			smoothScroll(event, link)


		# $(document).bind 'scroll', (event) ->
		# 	console.log $('#rapper').offset().top
			
			
	sendScore = ->
		scoreFactor = Math.floor(Math.random() * -1000)
		points = ($('.hero').position().top * scoreFactor)
		if points >= $('.score').find('h2 span').text()

			$('.score').find('h2 span').empty().text(points)


	changeVideo = (order) ->
		video = dataObject.videos
		video = video[order]
		player.cueVideoById(video.id)

		$('.videos h1').empty().text video.title
		$('.videos p.body').empty().text video.body
		$('.videos p.body').slideDown()

	addComposers = (order,item) ->
		composers = $('.composer-nav ul li')
		composers.each (index) ->
			t = $(@)
			#account for zero indexing
			person = dataObject.composers[index + 1]
			name = person.name
			t.text(name)
			img = "img/#{person.image}"
			composerData = "<div class='composer-data'><img src='#{img}'/><p>#{person.bio}</p></div>"
			t.append composerData



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


	
		
	