function loadSkills(skills){
		var i=0,j;
		var skillsInnerHTML='';
		while(i<skills.length){

			var row = '<div class="row">';
			for(j=i;j<i+6&&j<skills.length;j++){
				var skill = '<div class="col m2"><svg viewBox="0 0 128 128"><path d="'+skills[j].icon+'"></path></svg>'+skills[j].name+'</div>';
				row+=skill;
				
			}
			row+='</div>';
			skillsInnerHTML+=row;
			
			i=j;
		}
		$('#skills').html(skillsInnerHTML);
}

function loadProjects(projects){
	projects.sort(function(a,b){
		return a.sn-b.sn;
	});
	var i=0,j;
	var projectsInnerHTML='';
	for(i=0;i<projects.length;i++){					
		project = ' <div class="row project"><div class="col m12 s12"><div class="row"><span class="title">'+projects[i].projectTitle+'</span> | <small>'+projects[i].periodStart+'-'+projects[i].periodEnd+'</small><hr></div>'
        details = '<div class="row">Info:&nbsp'+projects[i].shortInfo+'</div>';
        project += details;
		toolsUsed = '<div class="row">Tools Used:&nbsp';
		for(j=0;j<projects[i].toolsUsed.length;j++){
			toolsUsed+='<span>#'+projects[i].toolsUsed[j]+'</span>&nbsp';
		}
		toolsUsed+='</div>';
		project+=toolsUsed;
		tags = '<div class=row">Tags:&nbsp';
		for(j=0;j<projects[i].tags.length;j++)tags+='<span class="tag">#'+projects[i].tags[j]+'</span>&nbsp';
        tags+='</div><div class="row">Link:&nbsp'
		if(projects[i].link!="#") tags+='<a href="'+projects[i].link+'" target="_blank">'+projects[i].link+'</a>'
        else tags+='<a href="#projects">Link will be updated soon.</a>'
        tags+='</div>'
		project+=tags;
		project+='</div></div>';
		projectsInnerHTML+=project;
	}
	$('#projects').html(projectsInnerHTML);
}

function loadWorks(experince){
	experince.sort(function(a,b){
		return a.sn-b.sn;
	});
	var i;
	var works = experince.filter((experince)=>experince.type=="volunteer");
	var worksInnerHTML = '';
	for(i=0;i<works.length;i++){
		worksInnerHTML+=`
		<div class="row work">
			<div class="row title">
				${works[i].workPosition} | <small> ${works[i].periodStart} - ${works[i].periodEnd}</small>
			</div>
			<hr/>
			<div class="row details">
                <a href="${works[i].link}" target="_blank"><h5>${works[i].organisation}</h5></a>
				${works[i].details}
			</div>
		</div>`;
	}
    
    var others = experince.filter((experince)=>experince.type=="work");
    
    for(i=0;i<others.length;i++){
		worksInnerHTML+=`
		<div class="row work">
			<div class="row title">
				<a href="${others[i].link}">${others[i].organisation}</a> |
				${others[i].workPosition} |
				${others[i].periodStart} - ${others[i].periodEnd}
			</div>
			<hr/>
			<div class="row details">
				${others[i].details}
			</div>
		</div>`;
	}
	$('#experience').html(worksInnerHTML);
}

function loadEducations(educations){
	var i=0,j;
	var educationsInnerHTML = '';
	for(i=0;i<educations.length;i++){
		education = '<div class="row education"><div class="col m6 s12"><div class="row title">'+educations[i].course+'<hr></div><div class="row">'+educations[i].periodStart+'-'+educations[i].periodEnd+'</div><div class="row">'+educations[i].inst+'</div><div class="row">'+educations[i].board+'</div>		<div class="row">Scored: '+educations[i].score+'</div></div><div class="col m6 s12 details"><ul class="collapsible" data-collapsible="accordion"><li><div class="collapsible-header"><i class="material-icons">view_list</i>Completed following Core courses</div><div class="collapsible-body">';
		var courses = educations[i].courses;
		courses.sort(function(a,b){
			return a.sn-b.sn;
		});
		var coursesInnerHTML = '';
		for(j=0;j<courses.length;j++){
				coursesInnerHTML+='<div class="row"><div class="col m2 s2">'+courses[j].courseCode+'</div><div class="col m10 s10">'+courses[j].courseName+'</div></div>';
		}
		education+=coursesInnerHTML;
		education +='</div></li></ul></div></div>';
		educationsInnerHTML+=education;
	}
	$('#education').html(educationsInnerHTML);
}

function loadLinks(profileLinks){
	var i=0,j;			
	profileLinks.sort(function(a,b){
		return a.sn-b.sn;
	});
	var profileLinksInnerHTML = '';
	while(i<profileLinks.length){
		profileLinksInnerHTML+='<div class="row">'
		for(j=i;j<profileLinks.length&&j<i+5;j++){
			profileLinksInnerHTML+='<div class="col s2">													<a href="'+profileLinks[j].link+'" target="_blank" >					<img src="img/'+profileLinks[j].icon+'" alt="'+profileLinks[j].name+'">															</a></div>';
		}
		profileLinksInnerHTML+='</div>';
		i=j;
	}
	$('#links').html(profileLinksInnerHTML);
}

function loadLikes(likes){
	likes = likes.sort(function(a,b){
		return a.sn-b.sn;
	});
	var i;
	var likesInnerHTML = '<h4>I like</h4>';
	for(i=0;i<likes.length;i++){
		likesInnerHTML+='<object type="image/svg+xml" data="img/'+likes[i].icon+'">'+likes[i].name+'</object>'
	}
	$('#likes').html(likesInnerHTML);
}


function onBodyLoad(){
	console.log('body loaded called');
	$('div.progress').css('display','none');
	$('div.content').css('display','block');
	$('.collapsible').collapsible({
		'accordion' : true
	});
	$('#tabs').tabs({ swipeable : true,
      responsiveThreshold : 1280 });
	onWindowResize();
}

function onWindowResize(){
	const heightPageA = parseInt($('#pagea').css('height').replace('px',''),10);
	const tabContentHeight = Math.max(heightPageA-48,(window.innerHeight - 50)) + 'px';
    
	const tabs = document.getElementsByClassName('tabs-content carousel initialized');
	if (tabs && tabs[0]) {
		tabs[0].style.height = tabContentHeight;
	}
	$('#skills div.m2').css('height',$('#skills div.m2').css('width'));
	$('#image img').css('height',$('#image img').css('width'));
}


$(window).resize(onWindowResize);

var profile;

$.get("js/profile.json", 
	function(data, status){
		console.log('Got profile:',data,' \n with status:',status);
		if(status!=="success") {
			window.location.href = "/error.html";
		}
		profile = data;
		var pInfo = profile.personalInfo;
		$('title').html(pInfo.fname+ ' '+pInfo.lname+' '+pInfo.nick+' | Portfolio');
		$('#name').html(pInfo.fname+' '+pInfo.lname);
		$('#image img').attr('src','img/'+pInfo.myimg);
		$('#contact').html(pInfo.mob+'</br>'+pInfo.email);
		$('#summary').html(profile.summary);
		$('#tabs').html(`<ul class"tabs">				
			<li class="tab col s2"><a href="#hello">About Me</a></li>
			<li class="tab col s2"><a href="#skills">Skills</a></li>
			<li class="tab col s2"><a href="#projects">Projects</a></li>
			<li class="tab col s3"><a href="#experience">Experience</a></li>
			<li class="tab col s3"><a href="#education">Education</a></li></ul>
		`);
		$('#believe').html('<h4>I believe</h4><span></span>');
		const typed = new Typed('#believe span', {
			strings: profile.qoutes,
			typeSpeed: 40,
			cursorChar:"_",
			loop:true
		});
		loadLikes(profile.likes);
		$('#helloText').html(profile.helloText);
		loadLinks(profile.profileLinks);
		loadSkills(profile.skills);
		loadProjects(profile.projects);
		loadWorks(profile.experince);
		loadEducations(profile.educations);
		console.log('body loaded calling');
		onBodyLoad();
});
