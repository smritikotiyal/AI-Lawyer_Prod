var suggestionWrapper   = document.getElementById('suggestion-wrapper');
var btnFindSoc          = document.getElementById('btnFindSoc');
var responseAlert       = document.getElementById('responseAlert');
var response            = document.getElementById('response');
var socForm             = document.getElementById('socForm');
var suggestionForm      = document.getElementById('suggestionForm');

window.onload = function(e){
    suggestionWrapper.style.display = 'none';
    responseAlert.style.display     = 'none';
    btnFindSoc.disabled             = false;
    // responseAlert.classList.add('');
}

// find soc onclinck function.
function findSocCallback() {
    var jobDescription      = document.getElementById('jobDescription').value;
    var hiddenDiv = document.querySelector( '.select-suggestion' );
    var radioHtmlBox = document.querySelector( ".suggestion-list" );
    var hiddenInputElement = document.querySelector( ".hidden-input" );
    console.log('jobDescription : ', jobDescription);
    if ( !jobDescription ) {
        responseAlert.classList.add('alert-error');
        responseAlert.classList.remove('alert-success');
        responseAlert.style.display         = 'flex';
        responseAlert.style.backgroundColor = '#f8d7da';
        response.innerHTML                  = "Please enter job description.";
        return false;
    } else {
       // responseAlert.style.display     = 'none';
        // suggestionWrapper.style.display = 'block';

        // SK Code : 12 November 2021 - Start
        function df() {
            var tmp = null;
            $.ajax({
                async: false,
                type: "POST",
                url: "/#findSOC",
                data: { 'jd' : jobDescription},
                'success': function (data) {
                    tmp = data;
                }
            });
           return tmp;
        };
        data = df();
        console.log('developer.js data : ', data);

        var radioHtml = '';
        var hiddenInput = '';
        var socInput = ''
        var count = 1;
        console.log('data : ', data)

        data['jd2'] = jobDescription;

        for (var i = 1; i < Object.keys(data).length; i++) {
            if ( data[ 'SOC' + i ] ) {
                var socVal = data[ 'SOC' + i ];
                var socDesc = data[ 'SOC' + i + '_desc_' + i ] ? data[ 'SOC' + i + '_desc_' + i ] : '';
                radioHtml += '<div class="suggestion-item"> <div class="box"> <div class="info"> <a href="https://onsdigital.github.io/dp-classification-tools/standard-occupational-classification/data/SingleClass.html?soc='+data[ 'SOC' + i ]+'" target="_blank"><svg class="svg-icon"><use xlink:href="../static/images/svg-sprite.svg#info-circle"></use></svg></a> </div>'
                radioHtml += '<div class="text"> <label for="radio_'+i+'">'+socVal+', '+socDesc+'</br> </br>';
                // radioHtml += '<div class="detail"><details><summary>Eligibility criteria</summary><ul><li>PhD: '+data[ 'SOC' + i + '_phd_' + i ]+'</li><li>ICT and ICGT: '+data[ 'SOC' + i + '_ict_icgt_' + i ]+'</li><li>SW Visa: '+data[ 'SOC' + i + '_eligible_' + i ]+'</li><li>Skill Level: '+data[ 'SOC' + i + '_rqf_' + i ]+'</li><li>NOTE: '+data[ 'SOC' + i + '_note_' + i ]+'</li></ul></details></div>'
                // radioHtml += '<div class="detail"><details><summary>Expected Salary</summary><ul><li>Rate: '+data[ 'SOC' + i + '_rate_' + i ]+'</li><li>90B: '+data[ 'SOC' + i + '_90B_' + i ]+'</li><li>80CD: '+data[ 'SOC' + i + '_80CD_' + i ]+'</li><li>70E: '+data[ 'SOC' + i + '_70E_' + i ]+'</li><li>Hours: '+data[ 'SOC' + i + '_hours_' + i ]+'</li></ul><button onclick="openNav(' + i + ')">Calculate Pro Rata</button></details></div>'
                // radioHtml += '<button onclick="openNav(' + i + ')">Calculate Pro Rata</button>'
                // radioHtml += '<button class="btn" onclick="openNav(' + i + ')"><i class="fa fa-file-text" aria-hidden="true"></i></button>'
                radioHtml += '<div class="btn" onclick="openNav(' + i + ')"><i class="fa fa-file-text" aria-hidden="true"></i></div>'
                radioHtml += '<input type="radio" name="suggestions" class="radio-input" id="radio_'+i+'" value="'+socVal+'"><span class="checkmark"></span></label></div></div></div>';
                radioHtmlBox.innerHTML = radioHtml;

                socInput += '<input type="text" name="suggestions" value="' + data[ 'SOC' + i ] + '">';
                hiddenInputElement.innerHTML = socInput;
            }

            if ( data[ 'M' + i ] ) {
                hiddenInput += '<input type="hidden" name="M'+ i +'" id="M'+ i + '" value="' + data[ 'M' + i ] + '">';
                hiddenInputElement.innerHTML = hiddenInput;
            }
        }
        hiddenDiv.classList.add( 'soc-hidden' );
        suggestionWrapper.style.display = 'block';
        document.getElementById("suggestionForm").scrollIntoView(true);
        // window.location = '../templates/findSOC.html/#suggestionForm'
        // SK Code : 12 November 2021 - End
    }
}
function checkRadio(){
    var suggestions = document.getElementsByName('suggestions');
    var i = 0;
    while (i < suggestions.length) {
        // console.log('suggestions[i].checked : ', suggestions[i].checked);
        suggestions[i].checked = false;
        i++;
    }
}

// form submission onclinck function.
function submissionCallback() {
    var suggestions = document.getElementsByName('suggestions');
    var radioInput = document.querySelector( 'input[type="radio"]:checked' );
    console.log('radioInput : ', radioInput)
    var socCode     = document.getElementById('socCode').value;
    console.log('suggestions : ', suggestions);
    console.log('socCode : ', socCode);
    btnFindSoc.disabled         = true;
    btnFindSoc.style.cursor     = 'not-allowed';
    var i = 0;
    var isAllRadioChecked = false;
    while (i < suggestions.length) {
        // console.log('suggestions[i].checked : ', suggestions[i].checked);
        if (suggestions[i].checked) {
            isAllRadioChecked = true;
            if(socCode.length > 0){
                suggestions[i].checked = false;
            }
        }
        i++;
    }
    /*console.log('isAllRadioChecked : ', isAllRadioChecked, (false === isAllRadioChecked))
    console.log('radioInput : ', radioInput, radioInput != null)
    console.log('socCode : ', socCode, (!socCode), socCode != null, socCode.length)*/
    function submitForm(){
        
    }

    // Check radio button selected or not.
    // Check soc code || Job description entered or not.
    if( (false === isAllRadioChecked && (!socCode)) || (radioInput != null && socCode.length > 0) ) //|| !jobDescription)) 
    {
        // console.log(isAllRadioChecked, socCode, radioInput.value)
        responseAlert.style.display         = 'flex';
        responseAlert.style.backgroundColor = '#f8d7da';
        response.innerHTML                  = "Please either select a suggestion or enter one manually.";
        document.getElementById("response").scrollIntoView(true);
        // return false;
    } else {
        console.log('Inside else');
        if(radioInput != null){
            data['radio'] = radioInput.value;
            
        }
        else{
            data['manual'] = socCode;
        }

        function df() {
            var tmp = null;
            $.ajax({
                async: false,
                type: "POST",
                url: "/#socCode",
                data: data,
                'success': function (out) {
                    tmp = out;
                }
            });
           return tmp;
        };

        message = df();

        responseAlert.classList.add('alert-success');
        responseAlert.classList.remove('alert-error');
        responseAlert.style.display = 'none';
        responseAlert.style.display = 'flex';
        responseAlert.style.backgroundColor = '#d4edda';

        socForm.reset();
        suggestionForm.reset();
        suggestionWrapper.style.display = 'none';
        response.innerHTML = "Your SOC Code has been submitted successfully.";
        btnFindSoc.disabled = false;
        btnFindSoc.style.cursor     = 'grab';
        return true;
    }
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  function openNav(n = 0) {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("prorata").style.display = "none";
    document.getElementById("offsaleval").style.display = "none";
    document.getElementById("repkey").style.display = "none";
    console.log("openNav : ", n);
	console.log('data : ', data)
    var report_soc = data['SOC' + n]
    var report_desc = data['SOC' + n + '_desc_' + n]
    console.log(report_soc, report_desc)
    var report_rate = data['SOC' + n + '_rate_' + n]
    var report_90B = data['SOC' + n + '_90B_' + n]
    var report_80CD = data['SOC' + n + '_80CD_' + n]
    var report_70E = data['SOC' + n + '_70E_' + n]
    var report_hours = data['SOC' + n + '_hours_' + n]

    var report_eligible = data['SOC' + n + '_eligible_' + n]
    var report_ict_icgt = data['SOC' + n + '_ict_icgt_' + n]
    var report_phd = data['SOC' + n + '_phd_' + n]
    var report_rqf = data['SOC' + n + '_rqf_' + n]
    var report_so = data['SOC' + n + '_so_' + n]
    var report_note = data['SOC' + n + '_note_' + n]
    var report_tab = data['SOC' + n + '_tab_' + n]

    var report_A_gen = data['salThresh0']
    var report_B_gen = data['salThresh1']
    var report_C_D_gen = data['salThresh2']
    var report_E_gen = data['salThresh3']
    console.log('Data Tab : ', data)

    var overlayHtmlReport = document.querySelector( ".overlay-content" );
    var overlayHtml = ''
    overlayHtml += '<h1> Report for SOC Code : '+ report_soc + ', ' + report_desc + '</h1>'
    overlayHtml += '<u><h3> Eligibiltiy Criteria </h3></u>' //<u> Eligible for PhD points (SW)? : </u>' + report_phd + '</br> Eligible for ICT and ICGT? : '+ report_ict_icgt + '</br> Eligible for SW? : '+ report_eligible + '</br> Skill Level ? : ' + report_rqf + '</br> Comments : ' + report_note + '</br> </br>'
    overlayHtml += '<table style="width:100%"><tr><th>Eligible for PhD points (SW)?</th><th>Eligible for ICT and ICGT?</th><th>Eligible for SW?</th><th>Skill Level</th><th>Minimum Hourly Wage</th><th>Shortage Occupation (SO)?</th>'
    if(report_note != "None"){overlayHtml += '<th>Comments</th></tr>'}
    else{overlayHtml += '</tr>'}
    overlayHtml += '<tr><td>' + report_phd + '</td><td>' + report_ict_icgt + '</td><td>' + report_eligible + '</td><td>' + report_rqf + '</td><td><strong>??10.10</strong></td><td>' + report_so + '</td>'
    if(report_note != "None"){'<td>' + report_note + '</td></tr></table>'}
    else{'</tr></table>'}
    overlayHtmlReport.innerHTML = overlayHtml;

    var overlayHtmlLegend = document.querySelector( ".overlay-content-legend" );
    var overlayLegend = '';
    overlayLegend +='<h5>Tradeable Options : <ul>'
    if(report_tab == 1){
        overlayLegend += '<li>Option A (100%) - An applicant' + "'" + 's salary</li>'
        overlayLegend += '<li>Option B (90%) - person with a PHD relevant to the role, AND sponsored under a  qualifying ???PHD??? code job - the person???s PHD is a non-STEM PHD qualification.</li>'
        overlayLegend += '<li>Option C (80%) - person with a PHD relevant to the role, AND sponsored under a  qualifying ???PHD??? code job - the person???s PHD is a STEM PHD qualification.</li>'
        overlayLegend += '<li>Option D (80%) - a job that is a shortage occupation list role ??? with the exception of health and education codes that fall under national pay scales.</li>'
        overlayLegend += '<li>Option E (70%) - applies to a <strong>person</strong> who qualifies as a ???new entrant???. To qualify the CoS must not exceed 4 years. </br>'
        overlayLegend += '<h5>According to the Immigration Rules (See S.W. 4.2), a <i>New Entrant</i> is defined as someone who is <i>under the age of 26</i>, is <i>switching from the Student route to Skilled worker route</i> and had <i>held a UK student visa and completed a course at Bachelor???s degree or above within the last 2 years</i>.</h5></li></ul>'
    }
    overlayLegend +='<h5>Report Key : <ul>'
    overlayLegend += '<li>SW = Skilled Worker Visa</li>'
    overlayLegend += '<li>ESWN = England, Scotland, Wales, Northern Ireland</li><li>H & Ed : Health and Education</li></ul></h5>'
    overlayHtmlLegend.innerHTML = overlayLegend;

    console.log('report tab : ', report_tab)
    if(report_tab == 1)
    {   
        console.log('inside if  report_tab 1')
        var overlayReportKey = document.querySelector( ".overlay-content-reportkey" );
        var overlayReportKeyHtml = '';
        overlayReportKeyHtml += '<u><h3> Salary Requirements for the SOC Code</h3></u>' // <u> Going Rate : </u>' + report_rate + ' </br> 90% (Option B) : ' + report_90B + ' </br> 80% (Option C & D)  : ' + report_80CD + '</br> 70% (Option E) : ' + report_70E + '</br> Calculated per weekly Hours : ' + report_hours + '</br> </br>'
        overlayReportKeyHtml += '<table style="width:100%"><tr><th>Criteria</th><th>Option A</th><th>Option B</th><th>Option C & D</th><th>Option E</th></tr>'
        overlayReportKeyHtml += '<tr><td><strong>Going Rate default to ' + report_hours + ' hours/week </strong></td><td> ??' + report_rate + ' (??' + (report_rate/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_90B + ' (??' + (report_90B/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_80CD + ' (??' + (report_80CD/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_70E + ' (??' + (report_70E/52/report_hours).toFixed(2) + ' per hour)</td></tr>'
        overlayReportKeyHtml += '<tr><td><strong>General Salary Threshold </strong></td><td> ??' + report_A_gen + ' (??' + (report_A_gen/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_B_gen +' (??' + (report_B_gen/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_C_D_gen +' (??' + (report_C_D_gen/52/report_hours).toFixed(2) + ' per hour)</td><td> ??' + report_E_gen +' (??' + (report_E_gen/52/report_hours).toFixed(2) + ' per hour)</td></tr></table>'
        overlayReportKeyHtml += '<h6>NOTE : Going Rate is the minimum pay for the role. General Threshold for a Skilled Worker Visa is capped at 48 hours. If your salary does not meet the General Threshold of ??25,600 per annum, you may be able to trade points for a lower salary threshold.</h6>'
        overlayReportKeyHtml += '<u><h3> Salary Requirements after pro rata calculation</h3></u>'
        overlayReportKeyHtml += '<form><input type="text" name="hours" id="hours" required placeholder="Enter weekly working hours..."><input type="button" name="salcal" id="salcal" value="Submit" onclick="getSal('+ report_rate + ',' + report_hours + ',' + report_A_gen + ',' + report_B_gen + ',' + report_C_D_gen + ',' + report_E_gen + ')"></form>'
        //overlayReportKeyHtml +=  '</br>'
        document.getElementById("repkey").style.display = "block";
        overlayReportKey.innerHTML = overlayReportKeyHtml;
        // <form >
                    // <input type="text" name="hours" id="hours" value="{{request.form['hours']}}" required  placeholder="Enter weekly working hours..."
                        //				oninvalid="this.setCustomValidity('Enter weekly hours')"   oninput="this.setCustomValidity('')">
                    // <input type="button" name="salcal" id="salcal" value="Submit" onclick="getSal(30000, 39, 40)">
                // </form>
    }

    else if(report_tab == 3)
    {
        var overlayReportKey = document.querySelector( ".overlay-content-reportkey" );
        var overlayReportKeyHtml = '';
        overlayReportKeyHtml += '<u><h3>Going rates for listed healthcare occupation codes by administration and band default to ' + report_hours + ' Hours</h3></u>'
        overlayReportKeyHtml += '<table  style="width:100%"><thead><tr><th>Band or equivalent</th><th>England</th><th>Scotland</th><th>Wales</th><th>Northern Ireland</th></tr></thead>'
        overlayReportKeyHtml += '<tbody><tr><td>Band 3</td><td>??19737</td><td>??20700</td><td>??19737</td><td>??19737</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 4</td><td>??21892</td><td>??22700</td><td>??21892</td><td>??21892</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 5</td><td>??24907</td><td>??25100</td><td>??24907</td><td>??24907</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 6</td><td>??31365</td><td>??31800</td><td>??31365</td><td>??31365</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 7</td><td>??38890</td><td>??39300</td><td>??38890</td><td>??38890</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 8a</td><td>??45753</td><td>??49480</td><td>??45753</td><td>??45753</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 8b</td><td>??53168</td><td>??59539</td><td>??53168</td><td>??53168</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 8c</td><td>??63751</td><td>??71365</td><td>??63751</td><td>??63751</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 8d</td><td>??75914</td><td>??85811</td><td>??75914</td><td>??75914</td></tr>'
        overlayReportKeyHtml += '<tr><td>Band 9</td><td>??91004</td><td>??102558</td><td>??91004</td><td>??91004</td></tr></tbody></table>'
        overlayReportKeyHtml += '<u><h3> Salary Requirements after pro rata calculation</h3></u>'
        overlayReportKeyHtml += '<form><input type="text" name="bandhours" id="bandhours" required placeholder="Enter weekly working hours..."><input type="button" name="salcal" id="salcal" value="Submit" onclick="getBandSal(' + report_hours + ')"></form>'
        document.getElementById("repkey").style.display = "block";
        overlayReportKey.innerHTML = overlayReportKeyHtml;


    }
    	
  }

  function getSal(sal, h, a, b, c_d, e) 
			{
                var proh = document.getElementById("hours").value;
                console.log('proh : ', proh)
                disProh = proh
                //if(proh > 48){proh = 48}
                var pro = (sal/h) * proh

				console.log('pro : ', pro)
				var overlaySubHtmlReport = document.querySelector( ".overlay-content-subtext" );
                var overlaySubHtml = '';
               // overlaySubHtml += '<h4>Calculated per <strong>' + proh + '</strong> weekly Hours*</h4>'
               overlaySubHtml += '<table style="width:100%"><tr><th>Criteria</th><th>Option A</th><th>Option B</th><th>Option C & D</th><th>Option E</th></tr>'
               overlaySubHtml += '<tr><td><strong>Going Rate calculated ' + proh + ' hours/week</strong></td><td> ?? ' + pro.toFixed(2) + ' (??' + (pro/52/proh).toFixed(2) + ' per hour)</td><td> ??' + (pro*0.9).toFixed(2) + ' (??' + ((pro*0.9)/52/proh).toFixed(2) + ' per hour)</td><td> ??' + (pro*0.8).toFixed(2) + ' (??' + ((pro*0.8)/52/proh).toFixed(2) + ' per hour)</td><td> ??' + (pro*0.7).toFixed(2) + ' (??' + ((pro*0.7)/52/proh).toFixed(2) + ' per hour)</td></tr>'
               // overlaySubHtml += '<tr><td><strong>General Threshold</strong></td><td> ?? ' + ((report_A_gen/52/48) * proh * 52).toFixed(2) + ' (??10.26 per hour)</td><td> ??' + (9.23 * proh * 52).toFixed(2) + ' (??9.23 per hour)</td><td> ??' + (8.21 * proh * 52).toFixed(2) + ' (??8.21 per hour)</td><td> ??' + (8.21 * proh * 52).toFixed(2) + ' (??8.21 per hour)</td><td> ' + proh + '</td></tr>'
               overlaySubHtml += '<tr><td><strong>General Salary Threshold calculated ' + proh + ' hours/week</strong></td><td> ?? ' + ((a/52/48) * proh * 52).toFixed(2) + ' (??10.26 per hour)</td><td> ??' + ((b/52/48) * proh * 52).toFixed(2) + ' (??9.23 per hour)</td><td> ??' + ((c_d/52/48) * proh * 52).toFixed(2) + ' (??8.21 per hour)</td><td> ??' + ((e/52/48) * proh * 52).toFixed(2) + ' (??8.21 per hour)</td></tr>'
               /*if(disProh > 48)
                {
                    console.log('inside if')
                    overlaySubHtml += '<tr><td><strong>UKVI Minimum</strong></td><td colspan="4"> ?? ' + (10.10 * 48 * 52).toFixed(2) + '</td><td>48</td></tr>'
                }
                else{
                    overlaySubHtml += '<tr><td><strong>UKVI Minimum</strong></td><td colspan="4"> ?? ' + (10.10 * proh * 52).toFixed(2) + '</td><td>' + proh + '</td></tr>'
                }*/
                overlaySubHtml += '<tr><td><strong>??10.10 Hourly Minimum</strong></td><td colspan="4"> ?? ' + (10.10 * proh * 52).toFixed(2) + ' per year (??10.10 per hour)</td></tr></table>'
                if(disProh > 48){overlaySubHtml +='<h6>NOTE* : The Home Office takes only 48 weekly working hours into account when assessing if the general salary threshold is met.</h6>'}
               overlaySubHtml += '<u><h3> Salary Package Evaluation</h3></u>'
               overlaySubHtml += '<form><input type="text" name="saleval" id="saleval" required placeholder="Enter total offered salary..."><input type="button" name="saleval" id="saleval" value="Submit" onclick="evalSal(' + pro + ',' + proh + ',' + a + ')"></form>'
               // overlaySubHtml += '<tr><td> ?? ' + (10.26 * h * 52).toFixed(2) + ' (??10.26 per hour)</td><td> ??' + (9.23 * h * 52).toFixed(2) + ' (??9.23 per hour)</td><td> ??' + (8.21 * h * 52).toFixed(2) + ' (??8.21 per hour)</td><td> ??' + (8.21 * h * 52).toFixed(2) + ' (??8.21 per hour)</td><td>' + h + '</td></tr></table>'
                // overlaySubHtml += '<u> Going Rate : </u> ??' + pro.toFixed(2) + ' </br>90% (Option B) : ??' + (pro*0.9).toFixed(2) + ' </br> 80% (Option C & D)  : ??' + (pro*0.8).toFixed(2) + '</br> 70% (Option E) : ??' + (pro*0.7).toFixed(2) + '</br> Calculated per weekly Hours : ' + disProh
                
                document.getElementById("prorata").style.display = "block";
                overlaySubHtmlReport.innerHTML = overlaySubHtml;
			}
    
    function evalSal(pro, offHrs, a)
    {
        var offSal = document.getElementById("saleval").value;
        console.log('offSal : ', offSal)
        var res11 = 'Not Met';
        var res12 = 'Not Met';
        var res13 = 'Not Met';
        var res14 = 'Not Met';
        var resHr = 'Not Met';
        var perHr = (offSal/52/offHrs);
        console.log('perHr : ', perHr)
        var resthresh = 'Not Met';
        var overlaySalEvalHtmlReport = document.querySelector( ".overlay-content-evaluation" );
        var overlaySalEvalHtml = '';
        overlaySalEvalHtml += '<table style="width:100%"><tr><th>Criteria</th><th>Option A</th><th>Option B</th><th>Option C & D</th><th>Option E</th></tr>'
        if(offSal > pro){res11 = 'Met'}
        if((offSal) > (pro*0.9)){res12 = 'Met'}
        if((offSal) > (pro*0.8)){res13 = 'Met'}
        if((offSal) > (pro*0.7)){res14 = 'Met'}
        if(perHr > 10.10){resHr = 'Met'}
        if((perHr * 48 * 52) > a){resthresh = 'Met'}
        console.log('perHr * offHrs * 52 : ', perHr * offHrs * 52)
        overlaySalEvalHtml += '<tr><td><strong>Going Rate calculated ' + offHrs + ' hours/week</strong></td><td>' + res11 + '</td><td>' + res12 + '</td><td>' + res13 + '</td><td>' + res14 + '</td></tr>'
        overlaySalEvalHtml += '<tr><td><strong>General Threshold calculated 48 hours/week</strong></td><td colspan="4">Offered ?? ' + (perHr * 48 * 52).toFixed(2) + ' - '+  resthresh +'</td></tr>'
        overlaySalEvalHtml += '<tr><td><strong>??10.10 Hourly Minimum</strong></td><td colspan="4"> Offered ?? ' + (perHr).toFixed(2) + ' per hour - '+ resHr +'</td></tr></table>'
        
        document.getElementById("offsaleval").style.display = "block";
        overlaySalEvalHtmlReport.innerHTML = overlaySalEvalHtml;
    }