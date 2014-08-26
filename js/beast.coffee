$ ->
	#OG title video 1280x720
	#http://www.redbull.tv/Grilosodes/Grilosodes-s03e02

	#vid Ratio = 1.777777777778

	#<object type="application/x-shockwave-flash" data="http://c.brightcove.com/services/viewer/federated_f9?&amp;width=640&amp;height=360&amp;flashID=myExperience&amp;bgcolor=%23FFFFFF&amp;playerID=1684512102001&amp;playerKey=AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9&amp;isSlim=true&amp;dynamicStreaming=true&amp;autoStart=false&amp;debuggerID=&amp;videoID=3747213877001&amp;%40videoPlayer=3747213877001&amp;startTime=1409052391494" id="myExperience" width="640" height="360" class="BrightcoveExperience" seamlesstabbing="undefined"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="seamlessTabbing" value="false"><param name="swliveconnect" value="true"><param name="wmode" value="window"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF"></object>

	composerObject = {}
	videoObject = {}
	mixObject = {}
	additionalVideoObject = {}
	magazineObject = {}
	player1 = {}
	player2 = {}
	anchorElements = {}
	initCount = 0
	converter = new Showdown.converter()
	player = {}
	APIModules = {}
	vidRatio = 1.777777777777778

	playerData = {
			"playerID" : "1684512102001",
			"playerKey" : "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
			"width" : ($(window).width()) / 1.5,
			"height" : (($(window).width()) / 1.5) / vidRatio,
			"videoID" : "3747213877001"
		}

	playerTemplate = "<div style=\"display:none\"></div><object id=\"myExperience\" class=\"BrightcoveExperience\"><param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"width\" value=\"{{width}}\" /><param name=\"height\" value=\"{{height}}\" /><param name=\"playerID\" value=\"{{playerID}}\" /><param name=\"playerKey\" value=\"{{playerKey}}\" /><param name=\"isSlim\" value=\"true\" /><param name=\"isVid\" value=\"true\" /><param name=\"isUI\" value=\"true\" /><param name=\"dynamicStreaming\" value=\"true\" /><param name=\"@videoPlayer\" value=\"{{videoID}}\"; /><param name=\"includeAPI\" value=\"true\" /><param name=\"templateLoadHandler\" value=\"onTemplateLoad\" /><param name=\"templateReadyHandler\" value=\"onTemplateReady\" /></object>"

	

	init = ->
		setupBinds()
		# setupYouTube()
		addPlayer()
		$('.video-nav ul a.episode li').first().addClass "active"
		$('.story-nav ul a.additional-episode li').first().addClass "active"
		# setTimeout(sendHeight(getHeight()), 500)
		console.log 'init called'
		removeSpinner()
		

		

	prepInit = (count) ->
		initCount = initCount + count
		#make sure all data is done before calling init
		if initCount == 4
			init()
			initCount = 0

	sendHeight = (height) ->
		message = {height: height}
		messageJSON = JSON.stringify(message)
		console.log messageJSON
		return window.parent.postMessage(messageJSON, '*')

	getHeight = ->
		return $(document).height()

	window.onTemplateLoad = (experienceID) ->
		player = brightcove.api.getExperience(experienceID)
		APIModules = brightcove.api.modules.APIModules
		
		

	window.onTemplateReady = (evt) ->
		videoPlayer = player.getModule(APIModules.VIDEO_PLAYER)
		resizePlayer()
		videoPlayer.play()
		# resizeVid($('#player'))

	
	resizePlayer = ->
		vid = $('#player').find('object')
		ogWidth = vid.attr 'width'
		ogHeight = vid.attr 'height'
		winWidth = $(window).width()
		vidWidth = winWidth / 1.3
		
		ratio = ogWidth / ogHeight
		
		player.find('param[name="width"]').attr('vidWidth')
		# player.attr('height', vidWidth / ratio)
		console.log ogHeight

		diff = winWidth - vidWidth
		margin = diff / 2


	addPlayer = ->
		template = Handlebars.compile(playerTemplate)
		playerHTML = template(playerData)

		document.getElementById('player').innerHTML = playerHTML

		#instantiate player
		brightcove.createExperiences()


	# setupYouTube = ->
	# 	tag = document.createElement('script')
	# 	tag.src = "https://www.youtube.com/iframe_api"
	# 	firstScriptTag = document.getElementsByTagName('script')[0]
	# 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

	
	# window.onYouTubeIframeAPIReady = ->
	# 	player1 = new YT.Player 'player',
	# 		height: '39'
	# 		width: '64'
	# 		videoId: 'WYSupJ5r2zo'
	# 		events: {
	# 			"onReady": onPlayerReady1
	# 		}
	# 		playerVars: {
	# 			modestbranding: true
	# 			controls: 1
	# 			showinfo: 0
	# 			hd: 1

	# 		}
		
	# 	player2 = new YT.Player 'storyplayer',
	# 		height: '39'
	# 		width: '64'
	# 		videoId: 'VsbG4pXrhr8'
	# 		events: {
	# 			"onReady": onPlayerReady2
	# 		}
	# 		playerVars: {
	# 			modestbranding: true
	# 			controls: 1
	# 			showinfo: 0
	# 			hd: 1
	# 		}

	

	# onPlayerReady1 = (event) ->
	# 	resizeVid('#player')
	# 	sendHeight(getHeight())

	# onPlayerReady2 = (event) ->
	# 	resizeVid('#storyplayer')
	# 	sendHeight(getHeight())
	
	setupBinds = ->
		#resize
		window.addEventListener 'resize', ->
			# resizeVid('#player')
			# resizeVid('#storyplayer')
			# sendHeight(getHeight())

		$('a.arrow-right').click (event) ->
			event.preventDefault()
			composers = $('.composers-wrap')
			totalComposers = composers.find('.slide').length
			currentSlide = composers.find('.active')
			currentPos = currentSlide.data('order')

			#zero index
			if currentPos <= totalComposers - 2
				nextSlide = composers.find("[data-order=#{currentPos + 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'
				# sendHeight(getHeight())
			else
				nextSlide = composers.find("[data-order=0]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'
				# sendHeight(getHeight())

		$('a.arrow-left').click (event) ->
			event.preventDefault()
			composers = $('.composers-wrap')
			totalComposers = composers.find('.slide').length
			currentSlide = composers.find('.active')
			currentPos = currentSlide.data('order')

			if currentPos >= 1
				nextSlide = composers.find("[data-order=#{currentPos - 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'
				# sendHeight(getHeight())

			else
				nextSlide = composers.find("[data-order=#{totalComposers - 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'
				# sendHeight(getHeight())

		#DROP DOWN MENUS
		$('a.pulldown').click (event) ->
			event.preventDefault()
			$(@).parent().find('ul').slideToggle(200, ->
				sendHeight(getHeight())
				)



	changeVideo = (element, order, videoObject) ->
		video = videoObject[order].fields
		#account for zero index
		if element.find('li').hasClass "unreleased"
			player1.cueVideoById('T8k44ryj5DQ')
			player1.playVideo()
			$('.videos h1').empty().text video.episodeTitle
		else
			
			player1.cueVideoById(video.ytVideoId)
			$('.videos h1').empty().text video.episodeTitle
			# sendHeight(getHeight())


	changeAdditionalVideo = (order, additionalVideoObject) ->
		#account for zero index
		video = additionalVideoObject[order].fields
		# player2.cueVideoById(video.additionalYouTube)
		$('.stories h1').empty().text video.additionalVideoTitle
		$('.stories p.body').empty().text video.description
		$('.stories p.body').slideDown()
		# sendHeight(getHeight())




	addVideoTitles = (object, target, type) ->
		if type == 'main'
			for video, i in object
				episode = video.fields.episodeNumber
				currentDate = new Date()
				episodeDate = new Date(video.fields.datetimeOfLaunch)
				
				if moment() < episodeDate
					target.append("<a class='episode' href='#episode' data-order=#{i}><li class='unreleased' data-release='#{episodeDate}'>#{episode}</li>")

				else
					target.append("<a class='episode' href='#episode' data-order=#{i}><li class='released'>#{episode}</li>")

				#loop through and change text of unreleased vids
				target.find('li').each ->
					t = $(@)
					if t.hasClass('unreleased')
						
						ogText = t.text()
						releaseDate = t.data('release')
						d = new Date(releaseDate)

						t.bind 'mouseenter', ->
							t.empty().text(moment(releaseDate).format('ddd, MMM Do'))
						t.bind 'mouseleave', ->
							

		
		else if type == 'additional'
			for video, i in object
				episode = video.fields.additionalVideoTitle
				target.append("<a class='additional-episode' href='#additional-episode' data-order=#{i}><li>#{episode}</li>")


	

	addComposers = (object) ->
		for composer, i in object
			person = composer.fields
			name = person.composerName
			img = person.image.fields.file.url
			textBody = converter.makeHtml(person.bio)
			composerData = "<div class='slide' data-order='#{i}'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='#{img}'/></div><h2>#{person.composerName}</h2><p>#{textBody}</p></div>"
			$(".composers-wrap").append composerData
			$('.slide').first().addClass "active"
		


	addMixes = (object) ->
		for mix in object
			mixInfo = mix.fields
			name = mixInfo.artistName
			embed = mixInfo.rbmaRadioEmbedCode
			description = mixInfo.descriptions
			img = mixInfo.artistImage.fields.file.url
			mixData = "<div class='show'><img src='#{img}'/>#{embed}<p>#{description}</p></div>"
			$('.radio').append(mixData)
			# sendHeight(getHeight())


	resizeVid = (vidPlayer) ->
		player = $(vidPlayer)
		winWidth = $(window).width()
		vidWidth = winWidth / 1.3
		ogWidth = player.attr('width') #extra box shadow pix
		ogHeight = player.attr('height')
		ratio = ogWidth / ogHeight

		player.attr('width', vidWidth)
		player.attr('height', vidWidth / ratio)

		diff = winWidth - vidWidth
		margin = diff / 2
		player.css
			marginLeft: margin
			display: 'block'

		# sendHeight(getHeight())


	removeSpinner = ->
		$('.spinner').remove()
		# sendHeight(getHeight())
		


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
				changeVideo($(@), order, videoObject)



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

	