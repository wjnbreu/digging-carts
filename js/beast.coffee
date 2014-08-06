$ ->

	dataObject = {}
	player = {}

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
		

	# addData = (item, data) ->
	# 	#get video based on order
	# 	video = data.videos[item]
	# 	currentVideo = {
	# 		body: video.body
	# 		id: video.id
	# 		order: video.order
	# 		title: video.title
	# 	}
	# 	return currentVideo

		
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
				modestbranding: true
				controls: 0
				showinfo: 0
			}

	onPlayerReady = (event) ->
		resizeVid()
		

	setupBinds = ->
		console.log dataObject
		$('nav').bind 'mouseenter', ->
			$(@).transition
				left: 0
			, 200
		$('nav').bind 'mouseleave', ->
			$(@).transition
				left: '-100px'
			, 200
		$('a.episode').bind 'click', ->
			order = $(@).data 'order'
			changeVideo(order)

	changeVideo = (order) ->
		video = dataObject.videos
		video = video[order]
		player.cueVideoById(video.id)

		$('.videos h2').empty().text video.title
		$('.videos p.body').empty().text video.body

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


	getData()


	
		
	