$ ->
	composerObject = {}
	videoObject = {}
	mixObject = {}
	additionalVideoObject = {}
	magazineObject = {}
	player2 = {}
	initCount = 0
	converter = new Showdown.converter()
	player = {}
	APIModules = {}
	modVP = {}
	vidRatio = 640 / 360
	targetVideo = {}
	playerTemplate = ""
	currentCountry = ""

	brightcoveVideos = []

	isMobile = false

	#DEFAULT ENGLISH
	playerData = {}

	playerIDS = {
		"spanish" : "ref:MI201408250036",
		"german" : "ref:MI201408250036",
		"french" : "ref:MI201408250036",
		"polish" : "ref:MI201408250036",
		"italian" : "ref:MI201408250036",
		"japanese" : "ref:MI201408250036",
		"brazilian" : "ref:MI201408250036",
		"turkish" : "ref:MI201408250036",
		"default" : "3747000906001"
	}



	init = ->
		setupBinds()
		#Brightcove
		addPlayer()
		$('.video-nav ul a.episode li').first().addClass "active"
		$('.story-nav ul a.additional-episode li').first().addClass "active"
		# setTimeout(sendHeight(getHeight()), 500)
		sendHeight(getHeight())
		

	prepInit = (count) ->
		initCount = initCount + count
		#make sure all data is done before calling init
		if initCount == 6
			removeSpinner()
			init()
			initCount = 0

	findLocation = ->
		$.ajax 'http://freegeoip.net/json/',
			type: 'GET',
			dataType: 'json',
			error: (jqXHR, textStatus, errorThrown) ->
				console.log "#{textStatus}"
				currentCountry = "default"
				getData()
			success: (data, textStatus, jqXHR) ->
				currentCountry = data.country_name
				console.log "Country: #{currentCountry}"
				currentCountry = currentCountry.toLowerCase()
				getData()
				addInitialVideosByLanguage(data.country_name)

	addInitialVideosByLanguage = (country) ->
		#call init when finished

		country = country.toLowerCase()

		switch country
			#GERMAN
			when "germany" then updateInitPlayerData(playerIDS.german, country)
			when "austria" then updateInitPlayerData(playerIDS.german, country)
			#SPANISH
			when "spain" then updateInitPlayerData(playerIDS.spanish, country)
			when "mexico" then updateInitPlayerData(playerIDS.spanish, country)
			when "argentina" then updateInitPlayerData(playerIDS.spanish, country)
			when "colombia" then updateInitPlayerData(playerIDS.spanish, country)
			when "chile" then updateInitPlayerData(playerIDS.spanish, country)
			#JAPANESE
			when "japan" then updateInitPlayerData(playerIDS.japanese, country)
			#POLISH
			when "poland" then updateInitPlayerData(playerIDS.polish, country)
			#TURKISH
			when "turkey" then updateInitPlayerData(playerIDS.turkish, country)
			#ITALIAN
			when "italy" then updateInitPlayerData(playerIDS.italian, country)
			#FRENCH
			when "france" then updateInitPlayerData(playerIDS.french, country)
			#PORTUGUESE BRAZIL
			when "brazil" then updateInitPlayerData(playerIDS.brazilian, country)
			#DEFAULT	
			else
				updateInitPlayerData(playerIDS.default)


	
	updateInitPlayerData = (videoId, country) ->
		playerData = {
			"playerID" : "1684512102001",
			"playerKey" : "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
			"width" : ($(window).width()) / 1.5,
			"height" : (($(window).width()) / 1.5) / vidRatio,
			"videoID" : "#{videoId}"
		}
		playerTemplate = "<div style=\"display:none\"></div><object id=\"myExperience\" class=\"BrightcoveExperience\"><param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"width\" value=\"{{width}}\" /><param name=\"height\" value=\"{{height}}\" /><param name=\"playerID\" value=\"{{playerID}}\" /><param name=\"playerKey\" value=\"{{playerKey}}\" /><param name=\"isSlim\" value=\"true\" /><param name=\"autoStart\" value=\"false\" /><param name=\"isVid\" value=\"true\" /><param name=\"isUI\" value=\"true\" /><param name=\"dynamicStreaming\" value=\"true\" /><param name=\"@videoPlayer\" value=\"{{videoID}}\"; /><param name=\"includeAPI\" value=\"true\" /><param name=\"templateLoadHandler\" value=\"onTemplateLoad\" /><param name=\"templateReadyHandler\" value=\"onTemplateReady\" /></object>"
		currentCountry = country.toLowerCase()
		init()




	sendHeight = (height) ->
		message = {height: height}
		messageJSON = JSON.stringify(message)
		return window.parent.postMessage(messageJSON, '*')

	getHeight = ->
		return $(document.body).height()

	window.onTemplateLoad = (experienceID) ->
		player = brightcove.api.getExperience(experienceID)
		APIModules = brightcove.api.modules.APIModules
		modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER)
		
		

	window.onTemplateReady = (evt) ->
		# videoPlayer = player.getModule(APIModules.VIDEO_PLAYER)
		resizePlayer($('#myExperience'))
		modVP.addEventListener(brightcove.api.events.MediaEvent.BEGIN, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.ERROR, onMediaEventFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.PLAY, onMediaEventFired)
		# modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onMediaProgressFired)
		modVP.addEventListener(brightcove.api.events.MediaEvent.STOP, onMediaEventFired)
		sendHeight(getHeight())


	swapVideo = (order) ->
		modVP.getCurrentVideo(currentVideoCallback)

	currentVideoCallback = (currentVideo, order) ->
	
		switch currentCountry
			#GERMAN
			when "germany" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdGerman)
			when "austria" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdGerman)
			#FRENCH
			when "france" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdFrench)
			#JAPANESE
			when "japan" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdJapanese)
			#TURKISH
			when "turkey" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdTurkish)
			#BRAZIL
			when "brazil" then modVP.loadVideoByID(targetVideo.fields.brightVideoIdBrazil)
			#ITALIAN
			when "italy" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdItalian)
			#SPANISH
			when "spain" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
			when "mexico" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
			when "argentina" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
			when "colombia" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)
			when "chile" then modVP.loadVideoByID(targetVideo.fields.brightcoveVideoIdSpanish)

			else
				modVP.loadVideoByID(targetVideo.fields.brightcoveVideoId)
		
		$('.videos h1').empty().text(targetVideo.fields.episodeTitle)
		#reset
		# targetVideo = {}

	onMediaEventFired = (evt) ->
		return

	
	resizePlayer = (video) ->
		vid = video
		ogWidth = vid.attr "width"
		ogHeight = vid.attr "height"
		winWidth = $(window).width()
		ratio = ogWidth / ogHeight
		
		#target brightcove iframe on mobile
		if isMobile
			#if iframe is present, then use regex to remove width and height
			#from src attribute
			if vid.attr "src"
				src = vid.attr "src"
				regex = /width=([\d\.]*).*height=([\d\.]*)/
				newSrc = src.replace(regex, '')
				vid.attr("src", newSrc)
				return

		else
			vidWidth = winWidth / 1.6
			vid.attr("width", vidWidth)
			vid.attr("height", vidWidth / ratio)

			diff = winWidth - vidWidth
			margin = diff / 2


			vid.css
				marginLeft: margin
				marginRight: margin
				opacity: 1


	addPlayer = ->
		template = Handlebars.compile(playerTemplate)
		playerHTML = template(playerData)

		document.getElementById('player').innerHTML = playerHTML

		#instantiate player
		brightcove.createExperiences()


	setupYouTube = ->
		tag = document.createElement('script')
		tag.src = "https://www.youtube.com/iframe_api"
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

	
	window.onYouTubeIframeAPIReady = ->
		player2 = new YT.Player 'storyplayer',
			height: '39'
			width: '64'
			videoId: 'VsbG4pXrhr8'
			events: {
				"onReady": onPlayerReady2
			}
			playerVars: {
				modestbranding: true
				controls: 1
				showinfo: 0
				hd: 1
				origin: "http://www.redbullmusicacademy.com"
			}


	onPlayerReady2 = (event) ->
		resizeVid('#storyplayer')
	
	

	setupBinds = ->
		
		#resize
		window.addEventListener 'resize', ->
			resizeVid($('#myExperience'))
			resizeVid($('#storyplayer'))




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
			else
				nextSlide = composers.find("[data-order=0]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'

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

			else
				nextSlide = composers.find("[data-order=#{totalComposers - 1}]")
				currentSlide.removeClass 'active'
				nextSlide.addClass 'active'

		#DROP DOWN MENUS
		$('a.pulldown').click (event) ->
			event.preventDefault()
			$(this).parent().find('ul').slideToggle(200, ->
				sendHeight(getHeight())
				)
		$('a.episode').click (event) ->
			if $(this).children('li').hasClass "unreleased"
				return
			else
				swapVideo()



	changeVideo = (element, order, videoObject) ->

		video = videoObject[order].fields

		#account for zero index
		if element.find('li').hasClass "unreleased"
			$('.videos h1').empty().text video.episodeTitle
			return
		else
			player1.cueVideoById(video.ytVideoId)
			$('.videos h1').empty().text video.episodeTitle


	changeAdditionalVideo = (order, additionalVideoObject) ->
		#account for zero index
		video = additionalVideoObject[order].fields
		player2.cueVideoById(video.additionalYouTube)
		$('.stories h1').empty().text video.additionalVideoTitle
		if currentCountry == "japan"
			$('.stories p.body').empty().text video.japaneseDescription
		else
			$('.stories p.body').empty().text video.description
		$('.stories p.body').slideDown()




	addVideoTitles = (object, target, type) ->
		if type == 'main'
			for video, i in object
				episode = video.fields.episodeNumber
				currentDate = new Date()

				#USE EARLIER RELEASE FOR JAPAN
				if currentCountry == "japan"
					episodeDate = new Date(video.fields.datetimeOfLaunchJapan)
				else
					episodeDate = new Date(video.fields.datetimeOfLaunch)
					


				if moment() < episodeDate
					target.append("<a class='episode' href data-order=#{i}><li class='unreleased' data-release='#{episodeDate}'>#{episode}</li>")

				else
					target.append("<a class='episode' href data-order=#{i}><li class='released'>#{episode}</li>")

				#loop through and change text of unreleased vids
				target.find('li').each ->
					t = $(this)
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
				target.append("<a class='additional-episode' href data-order=#{i}><li>#{episode}</li>")


	

	addComposers = (object) ->
		for composer, i in object
			person = composer.fields
			name = person.composerName
			img = person.image.fields.file.url
			if currentCountry == "japan"
				if person.japaneseBio
					textBody = converter.makeHtml(person.japaneseBio)
				else
					textBody = converter.makeHtml(person.bio)
			else
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
		vidWidth = winWidth / 1.6
		ogWidth = player.attr('width') #extra box shadow pix
		ogHeight = player.attr('height')
		ratio = ogWidth / ogHeight

		if isMobile
			vidWidth = winWidth / 1.5

		player.attr('width', vidWidth)
		player.attr('height', vidWidth / ratio)

		diff = winWidth - vidWidth
		margin = diff / 2
		player.css
			marginLeft: margin
			display: 'block'

		#call resize AFTER video has sized
		sendHeight(getHeight())



	removeSpinner = ->
		$('.spinner').fadeOut ->
			$('.spinner').remove()

	detectMobile = ->
		if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
			isMobile = true


	addShareText = (shareText) ->
		twitter = $('.twitter-share')
		fb = $('.facebook-share')
		twitterText = shareText.twitterShareText
		facebookText = shareText.facebookShareText

		twitter.attr("href", "http://twitter.com/intent/tweet?text=#{twitterText}&related=rbma")
		fb.attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://www.redbullmusicacademy.com/magazine/diggin-in-the-carts&amp;t=#{facebookText}")
		#"http://twitter.com/home?status=What Difference Does It Make? A feature-length film about making music. Stream and download it here. http://www.rbma15.com"


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

			# addPlayer()
				
			$('a.episode').bind 'click', (event) ->
				event.preventDefault()
				$(this).parent().find('li').removeClass "active"
				$(this).find('li').addClass "active"
				order = $(this).data 'order'
				targetVideo = videoObject[order]
				if $(this).children('li').hasClass "unreleased"
					return
				else
					swapVideo()



		#RADIO
		client.entries({'content_type':'2YpXtnGW80EEGgCUsSMmCc', 'include': 1}).done (data) ->
			prepInit(1)
			addMixes(data)

		#ADDITIONAL YOUTUBE VIDS
		client.entries({'content_type':'6fwxAcXrxK4yqyaMUiWwWY', 'include': 1, 'order': 'fields.order'}).done (data) ->
			prepInit(1)
			additionalVideoObject = data
			console.log additionalVideoObject
			addVideoTitles(additionalVideoObject, $('.story-nav ul'), 'additional')

			$('a.additional-episode').bind 'click', (event) ->
				event.preventDefault()
				$(this).parent().find('li').removeClass "active"
				$(this).find('li').addClass "active"
				order = $(this).data 'order'
				changeAdditionalVideo(order, additionalVideoObject)

			setupYouTube()

		#ENDING TEXT
		client.entries({'content_type':'3JB3iYStpCGYGuu24mEcQK', 'include':1}).done (data) ->
			prepInit(1)
			$('footer p').empty().text(data[0].fields.body)

		#SOCIAL SHARE
		client.entries({'content_type':'5KnZeYIgc8oUo2cgssKAWK', 'include':1}).done (data) ->
			shareText = data[0].fields
			prepInit(1)
			addShareText(shareText)

			#"http://twitter.com/home?status=What Difference Does It Make? A feature-length film about making music. Stream and download it here. http://www.rbma15.com"


	#launch when ready
	findLocation()
	detectMobile()


	