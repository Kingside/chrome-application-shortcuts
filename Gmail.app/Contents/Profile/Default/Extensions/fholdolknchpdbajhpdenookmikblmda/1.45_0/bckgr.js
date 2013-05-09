//check whether to show the changelog...
var CURR_VERSION = "1.41";
function init() {
	if (!localStorage['autocorrectlist']){
		localStorage['autocorrectlist'] = defaultList;
	}
	
	var storedVer = localStorage['Version'] || '1.0';
	if (storedVer != CURR_VERSION) {
		localStorage['Version'] = CURR_VERSION;
		ezNotify();
	}
	
}

var ezlpnotification = null;
var eztimeout = null;
function ezNotify() {
	try {
		if (eztimeout != null) {
			clearTimeout(eztimeout);
		}
		
		if (ezlpnotification != null) {
			ezlpnotification.cancel();
		}
	
		ezlpnotification = null;
		ezlpnotification = webkitNotifications.createHTMLNotification('changelogSmall.html');
		//ezlpnotification = webkitNotifications.createNotification(
		//  'ez48.png',
		//  'New in ezAutoCorrect for Gmail',
		//  msg 
		//);
		ezlpnotification.show();
		
		//eztimeout = setTimeout('ezlpnotification.cancel();', 8000);

	} catch (err) {	}
}



var myport;
chrome.extension.onConnect.addListener(onPortConnect);
function onPortConnect(a){
	myport = a;
	a.onMessage.addListener(onMessageReceived);
}

function onMessageReceived(a, p, cb){
	if (a.message == 'getprefs') {
		var wordList = restore_list();
		var autoCap = restore_capitalize();
		var autoPeriod = restore_period();
		
		myport.postMessage({
			message: "prefs",
			WordList: wordList,
			AutoCap: autoCap,
			AutoPeriod: autoPeriod
		});	
	}
}

function restore_list() {
	return localStorage['autocorrectlist'] || defaultList;
}
function restore_capitalize() {
	return localStorage['defaultCap'] || '2';
}

function RestoreDefaults() {
	localStorage['autocorrectlist'] = defaultList;
}

function restore_period() {
	return localStorage['defaultPeriod'] || '2';
}

//the default list of correction ( US English only)
var defaultList = "w|with~r|are~u|you~gr8|great~im|I'm~i|I~ur|you are~abbout|about~abotu|about~abouta|about a~aboutit|about it~aboutthe|about the~abscence|absence~accesories|accessories~accidant|accident~accomodate|accommodate~accordingto|according to~accross|across~acheive|achieve~acheived|achieved~acheiving|achieving~acn|can~acommodate|accommodate~acomodate|accommodate~actualyl|actually~additinal|additional~addtional|additional~adequit|adequate~adequite|adequate~adn|and~advanage|advantage~affraid|afraid~afterthe|after the~aganist|against~aggresive|aggressive~agian|again~agreemeent|agreement~agreemeents|agreements~agreemnet|agreement~agreemnets|agreements~agressive|aggressive~ahppen|happen~ahve|have~allwasy|always~allwyas|always~almots|almost~almsot|almost~alomst|almost~alot|a lot~alraedy|already~alreayd|already~alreday|already~alwasy|always~alwats|always~alway|always~alwyas|always~amde|made~Ameria|America~amke|make~amkes|makes~anbd|and~andone|and one~andteh|and the~andthe|and the~anothe|another~anual|annual~apparant|apparent~apparrent|apparent~appearence|appearance~appeares|appears~applicaiton|application~applicaitons|applications~applyed|applied~appointiment|appointment~approrpiate|appropriate~approrpriate|appropriate~aquisition|acquisition~aquisitions|acquisitions~aren;t|aren't~arguement|argument~arguements|arguments~arn't|aren't~arond|around~artical|article~articel|article~asdvertising|advertising~assistent|assistant~asthe|as the~atention|attention~atmospher|atmosphere~attentioin|attention~atthe|at the~audeince|audience~audiance|audience~availalbe|available~awya|away~aywa|away~bakc|back~balence|balance~ballance|balance~baout|about~bcak|back~beacuse|because~becasue|because~becaus|because~becausea|because a~becauseof|because of~becausethe|because the~becauseyou|because you~becomeing|becoming~becomming|becoming~becuase|because~becuse|because~befoer|before~beggining|beginning~begining|beginning~beginining|beginning~beleiev|believe~beleieve|believe~beleif|belief~beleive|believe~beleived|believed~beleives|believes~benifit|benefit~benifits|benefits~betwen|between~beutiful|beautiful~blase|blas�~boxs|boxes~brodcast|broadcast~butthe|but the~bve|be~cafe|caf�~caharcter|character~calcullated|calculated~calulated|calculated~can;t|can't~candidtae|candidate~candidtaes|candidates~catagory|category~categiory|category~certian|certain~challange|challenge~challanges|challenges~chaneg|change~chanegs|changes~changable|changeable~changeing|changing~changng|changing~charachter|character~charachters|characters~charactor|character~charecter|character~charector|character~cheif|chief~chekc|check~chnage|change~cieling|ceiling~circut|circuit~claer|clear~claered|cleared~claerly|clearly~cliant|client~cliche|clich�~cna|can~colection|collection~comanies|companies~comany|company~comapnies|companies~comapny|company~combintation|combination~comited|committed~comittee|committee~commadn|command~comming|coming~commitee|committee~committe|committee~committment|commitment~committments|commitments~committy|committee~comntain|contain~comntains|contains~compair|compare~company;s|company's~compleated|completed~compleatly|completely~compleatness|completeness~completly|completely~completness|completeness~composate|composite~comtain|contain~comtains|contains~comunicate|communicate~comunity|community~condolances|condolences~conected|connected~conferance|conference~confirmmation|confirmation~considerit|considerate~considerite|considerate~consonent|consonant~conspiricy|conspiracy~consultent|consultant~convertable|convertible~cooparate|cooperate~cooporate|cooperate~corproation|corporation~corproations|corporations~corruptable|corruptible~cotten|cotton~coudl|could~coudln't|couldn't~coudn't|couldn't~couldn;t|couldn't~couldnt|couldn't~couldthe|could the~cpoy|copy~creme|cr�me~ctaegory|category~cusotmer|customer~cusotmers|customers~cutsomer|customer~cutsomers|customers~cxan|can~danceing|dancing~dcument|document~deatils|details~decison|decision~decisons|decisions~decor|d�cor~defendent|defendant~definately|definitely~deptartment|department~desicion|decision~desicions|decisions~desision|decision~desisions|decisions~detente|d�tente~develeoprs|developers~devellop|develop~develloped|developed~develloper|developer~devellopers|developers~develloping|developing~devellopment|development~devellopments|developments~devellops|develop~develope|develop~developement|development~developements|developments~developor|developer~developors|developers~develpment|development~diaplay|display~didint|didn't~didn;t|didn't~didnt|didn't~difefrent|different~diferences|differences~differance|difference~differances|differences~differant|different~differemt|different~differnt|different~diffrent|different~directer|director~directers|directors~directiosn|direction~disatisfied|dissatisfied~discoverd|discovered~disign|design~dispaly|display~dissonent|dissonant~distribusion|distribution~divsion|division~do'nt|don't~docuement|documents~docuemnt|document~documetn|document~documnet|document~documnets|documents~doens't|doesn't~doese|does~doesn;t|doesn't~doesnt|doesn't~doign|doing~doimg|doing~doind|doing~dollers|dollars~don;t|don't~donig|doing~dont|don't~dosn't|doesn't~driveing|driving~drnik|drink~eclair|�clair~efel|feel~effecient|efficient~efort|effort~eforts|efforts~ehr|her~eligable|eligible~embarass|embarrass~emigre|�migr�~enought|enough~entree|entr�e~equippment|equipment~equivalant|equivalent~esle|else~especally|especially~especialyl|especially~espesially|especially~excellant|excellent~excercise|exercise~exchagne|exchange~exchagnes|exchanges~excitment|excitement~exhcange|exchange~exhcanges|exchanges~experiance|experience~experienc|experience~exprience|experience~exprienced|experienced~eyt|yet~facade|fa�ade~faeture|feature~faetures|features~familair|familiar~familar|familiar~familliar|familiar~fammiliar|familiar~feild|field~feilds|fields~fianlly|finally~fidn|find~finalyl|finally~firends|friends~firts|first~follwo|follow~follwoing|following~fora|for a~foriegn|foreign~forthe|for the~forwrd|forward~forwrds|forwards~foudn|found~foward|forward~fowards|forwards~freind|friend~freindly|friendly~freinds|friends~frmo|from~fromthe|from the~furneral|funeral~fwe|few~garantee|guarantee~gaurd|guard~gemeral|general~gerat|great~geting|getting~gettin|getting~gievn|given~giveing|giving~gloabl|global~goign|going~gonig|going~govenment|government~goverment|government~gruop|group~gruops|groups~grwo|grow~guidlines|guidelines~hadbeen|had been~hadn;t|hadn't~haev|have~hapen|happen~hapened|happened~hapening|happening~hapens|happens~happend|happened~hasbeen|has been~hasn;t|hasn't~hasnt|hasn't~havebeen|have been~haveing|having~haven;t|haven't~hda|had~he;ll|he'll~hearign|hearing~helpfull|helpful~herat|heart~here;s|here's~hesaid|he said~hewas|he was~hge|he~hismelf|himself~hlep|help~hsa|has~hsi|his~hte|the~htere|there~htese|these~htey|they~hting|thing~htink|think~htis|this~hvae|have~hvaing|having~hwich|which~i|I~I\"m|I'm~I;d|I'd~I;ll|I'll~idae|idea~idaes|ideas~identofy|identify~ihs|his~imediate|immediate~imediatly|immediately~immediatly|immediately~importent|important~importnat|important~impossable|impossible~improvemnt|improvement~improvment|improvement~includ|include~indecate|indicate~indenpendence|independence~indenpendent|independent~indepedent|independent~independance|independence~independant|independent~influance|influence~infomation|information~informatoin|information~inital|initial~instaleld|installed~insted|instead~insurence|insurance~inteh|in the~interum|interim~inthe|in the~inwhich|in which~isn;t|isn't~isthe|is the~it;ll|it'll~it;s|it's~itis|it is~ititial|initial~itnerest|interest~itnerested|interested~itneresting|interesting~itnerests|interests~itwas|it was~iwll|will~iwth|with~jsut|just~jugment|judgment~knowldge|knowledge~knowlege|knowledge~knwo|know~knwon|known~knwos|knows~konw|know~konwn|known~konws|knows~labratory|laboratory~lastyear|last year~learnign|learning~lenght|length~let;s|let's~levle|level~libary|library~librarry|library~librery|library~liek|like~liekd|liked~lieutenent|lieutenant~liev|live~likly|likely~lisense|license~littel|little~litttle|little~liuke|like~liveing|living~loev|love~lonly|lonely~lookign|looking~maintenence|maintenance~makeing|making~managment|management~mantain|maintain~marraige|marriage~memeber|member~merchent|merchant~mesage|message~mesages|messages~mispell|misspell~mispelling|misspelling~mispellings|misspellings~mkae|make~mkaes|makes~mkaing|making~moeny|money~morgage|mortgage~mroe|more~mysefl|myself~myu|my~naive|na�ve~necassarily|necessarily~necassary|necessary~neccessarily|necessarily~neccessary|necessary~necesarily|necessarily~necesary|necessary~negotiaing|negotiating~nkow|know~nothign|nothing~nver|never~nwe|new~nwo|now~obediant|obedient~ocasion|occasion~occassion|occasion~occured|occurred~occurence|occurrence~occurrance|occurrence~ocur|occur~oeprator|operator~ofits|of its~ofthe|of the~oging|going~ohter|other~omre|more~oneof|one of~onepoint|one point~onthe|on the~onyl|only~oppasite|opposite~opperation|operation~oppertunity|opportunity~opposate|opposite~opposible|opposable~opposit|opposite~oppotunities|opportunities~oppotunity|opportunity~orginization|organization~orginized|organized~otehr|other~otu|out~outof|out of~overthe|over the~owrk|work~owuld|would~oxident|oxidant~papaer|paper~parliment|parliament~partof|part of~paymetn|payment~paymetns|payments~pciture|picture~peice|piece~peices|pieces~peolpe|people~peopel|people~percentof|percent of~percentto|percent to~performence|performance~perhasp|perhaps~perhpas|perhaps~permanant|permanent~perminent|permanent~personalyl|personally~pleasent|pleasant~poeple|people~porblem|problem~porblems|problems~porvide|provide~possable|possible~postition|position~potentialy|potentially~pregnent|pregnant~presance|presence~probelm|problem~probelms|problems~prominant|prominent~protege|prot�g�~protoge|prot�g�~psoition|position~ptogress|progress~puting|putting~pwoer|power~quater|quarter~quaters|quarters~quesion|question~quesions|questions~questioms|questions~questiosn|questions~questoin|question~quetion|question~quetions|questions~realyl|really~reccomend|recommend~reccommend|recommend~receieve|receive~recieve|receive~recieved|received~recieving|receiving~recomend|recommend~recomendation|recommendation~recomendations|recommendations~recomended|recommended~reconize|recognize~recrod|record~religous|religious~reluctent|reluctant~remeber|remember~reommend|recommend~representativs|representatives~representives|representatives~represetned|represented~represnt|represent~reserach|research~resollution|resolution~resorces|resources~respomd|respond~respomse|response~responce|response~responsability|responsibility~responsable|responsible~responsibile|responsible~responsiblity|responsibility~restaraunt|restaurant~restuarant|restaurant~reult|result~reveiw|review~reveiwing|reviewing~rumers|rumors~rwite|write~rythm|rhythm~saidhe|said he~saidit|said it~saidthat|said that~saidthe|said the~scedule|schedule~sceduled|scheduled~seance|s�ance~secratary|secretary~sectino|section~seh|she~selectoin|selection~sentance|sentence~separeate|separate~seperate|separate~sercumstances|circumstances~shcool|school~she;ll|she'll~shesaid|she said~shineing|shining~shiped|shipped~shoudl|should~shoudln't|shouldn't~shouldent|shouldn't~shouldn;t|shouldn't~shouldnt|shouldn't~showinf|showing~signifacnt|significant~simalar|similar~similiar|similar~simpyl|simply~sincerly|sincerely~sitll|still~smae|same~smoe|some~soem|some~sohw|show~soical|social~somethign|something~someting|something~somewaht|somewhat~somthing|something~somtimes|sometimes~soudn|sound~soudns|sounds~speach|speech~specificaly|specifically~specificalyl|specifically~statment|statement~statments|statements~stnad|stand~stopry|story~stoyr|story~stpo|stop~strentgh|strength~stroy|story~struggel|struggle~strugle|struggle~studnet|student~successfull|successful~successfuly|successfully~successfulyl|successfully~sucess|success~sucessfull|successful~sufficiant|sufficient~suposed|supposed~suppossed|supposed~suprise|surprise~suprised|surprised~swiming|swimming~tahn|than~taht|that~talekd|talked~talkign|talking~tath|that~tecnical|technical~teh|the~tehy|they~termoil|turmoil~tghe|the~tghis|this~thansk|thanks~thats|that's~thefirst|the first~thegovernment|the government~themself|themselves~themselfs|themselves~thenew|the new~theri|their~thesame|the same~thetwo|the two~they;l|they'll~they;ll|they'll~they;r|they're~they;re|they're~they;v|they've~they;ve|they've~theyll|they'll~theyve|they've~thgat|that~thge|the~thier|their~thigsn|things~thisyear|this year~thna|than~thne|then~thnig|thing~thnigs|things~threatend|threatened~thsi|this~thsoe|those~thta|that~tihs|this~timne|time~tiogether|together~tje|the~tjhe|the~tkae|take~tkaes|takes~tkaing|taking~tlaking|talking~todya|today~togehter|together~tomorow|tomorrow~tongiht|tonight~tonihgt|tonight~totaly|totally~totalyl|totally~tothe|to the~towrad|toward~traditionalyl|traditionally~transfered|transferred~truely|truly~truley|truly~tryed|tried~tthe|the~tyhat|that~tyhe|the~udnerstand|understand~understnad|understand~UnitedStates|United States~unliek|unlike~unpleasently|unpleasantly~untilll|until~useing|using~usualyl|usually~veyr|very~virtualyl|virtually~vis-a-vis|vis-�-vis~vrey|very~vulnerible|vulnerable~waht|what~warrent|warrant~wasnt|wasn't~watn|want~we;d|we'd~we;ll|we'll~we;re|we're~we;ve|we've~wehn|when~wern't|weren't~werre|were~what;s|what's~whcih|which~where;s|where's~wherre|where~whic|which~whihc|which~who;s|who's~who;ve|who've~whta|what~wief|wife~wierd|weird~wihch|which~wiht|with~willbe|will be~windoes|windows~witha|with a~withe|with~withthe|with the~wiull|will~wnat|want~wnated|wanted~wnats|wants~wo'nt|won't~woh|who~wohle|whole~wokr|work~won;t|won't~woudl|would~woudln't|wouldn't~wouldbe|would be~wouldn;t|wouldn't~wouldnt|wouldn't~wriet|write~writting|writing~wrod|word~wroet|wrote~wroking|working~wtih|with~wuould|would~wya|way~yera|year~yeras|years~yersa|years~yoiu|you~you;d|you'd~you;re|you're~youare|you are~youve|you've~ytou|you~yuo|you~yuor|your";


//run the init routine
init();