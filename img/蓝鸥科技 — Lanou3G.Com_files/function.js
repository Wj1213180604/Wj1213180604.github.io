var TeachUrl="../"+Model+"/";
var htmlimg="<img src='../img/loading.gif' border='0' />";
var htmlimgo="<img src='../img/loadimg.gif' border='0' />";
var plusP="../";
var ClassP="../class.html";
var eid;
var lovurl;
var tempIntDiff;
var ExamTimeLimit=0;

var topTeachMain=function(){
	var requests={"question":"CheckTeachMain"};
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var tops="";
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				loadings("h");
				$('#person').html("��"+$(ans).find("answer").attr("pos")+"��"+$(ans).find("answer").attr("name")+($(ans).find("answer").attr("locate")==""?"��������":"��"+$(ans).find("answer").attr("locate")+"��"));
				if(0<$(ans).find("answer").attr("dopass"))GetInitPasswdStu();
				else if(0==$(ans).find("answer").attr("doclass"))GetInitClasses();
				else{
					GetTeachMenu();
					hideForm("#Init","#fade");
				}
			}
		},
		complete:function(){
		}
	});
};

var GetInitPasswdStu=function(){
	var htmlinit="";
	htmlinit='<ul style="text-align:center;"><label id="judgeuser"></label><hr><li><span style="color:green;font-weight:bold;">Ϊ�˰�ȫ�������뽫��ʼ�����޸�Ϊ���Լ��ĵ�½���벢�μǣ�</span></li><p id="errmsginit" style="color:red;"></p><li>�µ����룺<input type="password" id="passwordinit" size="15" /></li><li>����ȷ�ϣ�<input type="password" id="confirmpswinit" size="15" /></li><li><hr><input type="button" value="�� ��" onclick="ChangePwdInitStu();" /> <span id="Operateloading"></span></li></ul>';
	$("#Init").html(htmlinit);
	$("#passwordinit").focus();
	$("#passwordinit").keypress(function(e){
		if('13'==e.keyCode){
			$("#confirmpswinit").focus();
		}
	});
	$("#confirmpswinit").keypress(function(e){
		if('13'==e.keyCode){
			ChangePwdInitStu();
		}
	});
	showForm("#Init","#fade");
	GetStudentSelf();
};

var GetStudentSelf=function(){
	var requests={"question":"GetStudentSelf"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#judgeuser").html('<p style="color:#333;margin-top:10px;padding:4px;line-height:30px;background-color:#DF7401;">����������<span style="color:#000;font-size:15px;font-weight:bold;">��'+$(ans).find("answer").attr("note")+'��</span>������֪ͨ������ʦ�˶�ѧ�ţ�<input id="submitoperate" name="input" type="button" onclick="teachlogout();" value="�˳���½" /></p>');
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var GetInitClasses=function(){
	var htmlinit="";
	htmlinit='<hr><ul style="text-align:center;"><li><span style="color:green;font-weight:bold;">��ѡ��һ����ǰ�ڿΰ༶��</span><span id="Operateloading0"></span><hr style="border:1px dashed #ccc;"><li id="clist"></li><hr style="border:1px dashed #ccc;"><li><input type="button" value=" ����ѧ����ѯ " onclick="gototeachclass();" /></li><hr></ul>';
	$("#Init").html(htmlinit);
	GetTeachClasslist();
	showForm("#Init","#fade");
};

var gototeachclass=function(){
	gotoWhere(ClassP,1);
};

var GetTeachClasslist=function(c){
	var requests={"question":"GetTeachClasslist"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading0").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading0").html("");
				$("#clist").html('<span style="color:red;">'+$(ans).find("answer").attr("note")+'</span>');
			}
			if(1==err){
				$("#Operateloading0").html("");
				var htmlclasslist ="";
				$(ans).find("clist").each(function(){
					htmlclasslist+='<label><input type="button" value="'+$(this).attr("name")+'" onclick="GetTeachMenu('+$(this).attr("id")+');" /> </label>';
				});
				$("#clist").html(htmlclasslist);
			}
		},
		complete:function(){
		}
	});
};

var GetTeachMenu=function(c){
	var requests={"question":"GetTeachMenu","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				var htmlOperate="";
				htmlOperate+='<li style="text-align:center;font-size:14px;font-weight:bold;line-height:35px;" ><span style="color:red;">�ܱ�Ǹ��</span><br />�����ڵİ༶��û�п��λ���û�а��ſγ̣�����ϵ������ʦ��</li><hr>';
				htmlOperate+='<li style="text-align:center;"><input id="submitoperate" name="input" type="button" onclick="teachlogout();" value="�˳���½" /> <span id="Operateloading"></span></li>';
				$("#Operate").html(htmlOperate);
				showForm("#Operate","#fade");
			}
			if(1==err){
				var cdo=ddo=0;
				loadings("h");
				hideForm("#Init","#fade");
				var htmlclasslist="";
				var htmlmenulist=""
				var htmlcurrentclass=$(ans).find("answer").attr("classN")==''?('<li style="color:#FFF;padding-top:10px;font-size:13px;">��ʦ��'+($(ans).find("answer").attr("teacherN")==''?'<span style="color:#CCC">����</span>':$(ans).find("answer").attr("teacherN"))+'��<br/><span style="color:#000;">>>></span><br/><span style="color:#00b6cf;font-size:11px;margin-top:15px;">ְ��ʦ��'+($(ans).find("answer").attr("staffN")==''?'<span style="color:#CCC">����</span>':$(ans).find("answer").attr("staffN"))+'��</span></li>'):'<li style="color:#FFF;padding-top:36px;font-size:13px;">�༶��'+$(ans).find("answer").attr("classN")+'��<a href="javascript:void(0);"><img src="images/change.png" border=0 style="width:20px;height:20px;margin-bottom:-5px;" alt="�л��༶" onclick="changeClass();" /></a></li>';
				$(ans).find("clist").each(function(){
					if($(this).attr("thiscid")>0)htmlclasslist+='<dl class="on" id="dl'+$(this).attr("id")+'"><dt><a style="color:#FFF;font-weight:bold;" href="javascript:void(0);" onclick="menus('+$(this).attr("id")+');" >'+$(this).attr("cname")+'</a></dt><dd id="dd'+$(this).attr("id")+'" class="cnemu"><ul class="dlist">';
					else htmlclasslist+='<dl id="dl'+$(this).attr("id")+'"><dt><a style="color:#FFF;font-weight:bold;" href="javascript:void(0);" onclick="menus('+$(this).attr("id")+');" >'+$(this).attr("cname")+'</a></dt><dd id="dd'+$(this).attr("id")+'" class="cnemu" style="display:none;"><ul class="dlist">';
					for(var i=1;i<=$(this).attr("cdays");i++){
						if($(this).attr("thiscday")==i){
							cdo=$(this).attr("id");
							ddo=i;
							htmlclasslist+='<li class="curday" id="'+$(this).attr("id")+'li'+i+'"><a href="javascript:void(0);" onclick="gotoDoc('+$(this).attr("id")+','+i+');">'+($(this).attr("cdaysN")==""?'DAY_'+i:$(this).attr("cdaysN"))+'</a></li>';
						}else htmlclasslist+='<li id="'+$(this).attr("id")+'li'+i+'"><a href="javascript:void(0);" onclick="gotoDoc('+$(this).attr("id")+','+i+');">'+($(this).attr("cdaysN")==""?'DAY_'+i:$(this).attr("cdaysN"))+'</a></li>';
					}htmlclasslist+='</ul></dd></dl>';
				});
				$(ans).find("mlist").each(function(){
					htmlcurrentclass+='<li><a href="javascript:void(0);" onclick="'+$(this).attr("id")+'();"><img src="images/'+$(this).attr("id")+'.jpg" style="border-radius:10px;box-shadow:2px 2px 2px #319fff;" /></a></li>';
				});
				$(ans).find("dayoff").each(function(){
					htmlcurrentclass+='<li style="text-align:center;"><span style="line-height:19px;color:#FFF;font-size:7pt;"><span style="border-radius:4px;background-color:#00b6cf;padding:2px 10px 2px 10px;">���ټ�¼</span><br/>���١�'+$(this).attr("count")+'����<br/>����'+(parseInt($(this).attr("limit"))<parseInt($(this).attr("length"))?'<span style="color:red;">'+$(this).attr("length")+'</span>':$(this).attr("length"))+'��Сʱ</span></li>';
				});
				$(ans).find("studytopay").each(function(){
					htmlcurrentclass+='<li style="text-align:center;padding:4px 10px 4px 10px;"><span style="border-radius:4px;background-color:#CCC;padding:6px 10px 6px 10px;line-height:24px;">����ѧ��</span><br/><br/><u style="color:#CCC;">'+(0==$(this).attr("val")?'���ѽ��塿':(0>$(this).attr("val")?"����":"")+$(this).attr("fee"))+'</u></span></li>';
				});
				if(0<$(ans).find("studycredit").size()){
					var htmlcredit = '';
					var colorCreditA=colorCreditD='Green';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					htmlcredit+='<span style="font-size:14px;font-weight:bold;padding:2px 7px 2px 7px;color:#FFF;background-color:'+colorCreditA+';border-radius:5px;">����'+creditA+'</span> <span style="font-size:14px;font-weight:bold;padding:2px 7px 2px 7px;color:#FFF;background-color:'+colorCreditD+';border-radius:5px;">����'+creditD+'</span>&nbsp;';
				}
				$("#scredit").html(htmlcredit);
				$("#caidan").html(htmlclasslist);
				$("#menuli").html(htmlcurrentclass);
				gotoDoc(cdo,ddo);
			}
		},
		complete:function(){
		}
	});
};

var changeClass=function(){
	var requests={"question":"ChangeClass"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			hideForm("#Operate","null");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				topTeachMain();
			}
		},
		complete:function(){
		}
	});
};

var CloseWin=function(i){
	hideForm("#"+i,"#fade");
};

var todotest=function(){
	var requests={"question":"GetResTestList"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				var htmlOperate="";
				htmlOperate+='<li style="font-size:14px;color:#0000ff;font-weight:bold;line-height:35px;" >'+$(ans).find("answer").attr("note")+'</li>';
				htmlOperate+='<ul id="reslist" style="padding-left:10px;font-size:14px;font-weight:bold;line-height:25px;">';
				htmlOperate+='</ul>';
				htmlOperate+='<li><input name="cancel" onclick="CloseWin(\'Operate\');" type="button" value="�ر�" /> <span id="Operateloading"></span></li><br/>';
				$("#Operate").html(htmlOperate);
				getExamResult();
				showForm("#Operate","#fade");
			}
			if(1010==err){
				eid=$(ans).find("answer").attr("note");
				showForm("#Exams","#fade");
				GetExamtext();
			}
			if(1==err){
				var htmlOperate="";
				var htmlappendlist = "";
				htmlOperate+='<li style="font-size:14px;color:#0000ff;font-weight:bold;line-height:35px;" >��ѡ��Ҫ�����Ŀ��Կ�Ŀ������</li>';
				htmlOperate+='<li>��ȷ�Ϻ��ð༶ѧԱ���ɴ�������Ӧ�����⣩</li>';
				htmlOperate+='<hr style="border:1px dashed #ccc;"><ul style="padding-left:10px;font-size:14px;font-weight:bold;line-height:25px;">';
				$(ans).find("tlist").each(function(){
					$(this).find("exam").each(function(){
						htmlappendlist = "";
						if(0==$(this).attr("isSel"))htmlappendlist='<span style="font-size:9pt;color:red;">���γ̽���δ����</span>';
						else if(0==$(this).attr("isDone"))htmlappendlist='<span style="font-size:9pt;color:#999;">���Ծ������ɣ�>>> </span><a style="font-size:12px;color:#3399CC;font-weight:normal;" href="javascript:void(0);" onclick="checkExams('+$(this).attr("id")+');">[��������]</a> <a style="font-size:12px;color:#3399CC;font-weight:normal;" href="javascript:void(0);" onclick="checkTestresult('+$(this).attr("id")+');">[�ɼ���ѯ]</a>';
						if(0<$(this).attr("id"))htmlOperate+='<li><label><input type="radio" name="exam" value="'+$(this).attr("id")+'" '+((0==$(this).attr("isSel")||0==$(this).attr("isDone"))?'disabled':'')+'/><span id="exm'+$(this).attr("id")+'">'+$(this).attr("ename")+'</span>'+htmlappendlist+'</label></li>';
					});
				});
				htmlOperate+='</ul><hr style="border:1px dashed #ccc;">';
				htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="TodoTeachExam();" value="ȷ��" /> <input name="cancel" onclick="CloseWin(\'Operate\');" type="button" value="�ر�" /> <span id="Operateloading"></span></li><br/>';
				$("#Operate").html(htmlOperate);
				showForm("#Operate","#fade");
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var checkTestresult=function(i){
	showForm("#resTlist","null");
	var requests={"question":"GetTestResult","exid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#resTlist").html("���ڼ��سɼ�..."+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin0(\'resTlist\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#resTlist").html("");
				CloseWin0('resTlist');
			}
			if(1==err){
				var htmlresTlist="";
				var avgcredit=$(ans).find("answer").attr("avgcredit");
				htmlresTlist+='<hr>'+$("#exm"+i).text()+'�ɼ���<span style="color:brown;font-weight:bold;">ƽ���֡�'+avgcredit+'��</span> [<a href="javascript:void(0);" onclick="refreshResult('+i+');">ˢ��</a>] [<a href="javascript:void(0);" onclick="CloseWin0(\'resTlist\');">�ر�</a>]<hr style="border:1px dashed #ccc;"><ul style="padding:0px 0 20px 0;">';
				$(ans).find("data").each(function(){
					htmlresTlist+='<li style="line-height:18px;width:33%;float:left;font-color:#999;">��'+$(this).find("snumber").text()+'��'+$(this).find("sname").text()+'<span style="color:#666;font-weight:normal;font-size:12px;"></span>��'+($(this).find("rcredit").text()==''?'<span style="color:#CCC">����</span>':'<span style="color:blue;">'+$(this).find("rcredit").text()+'</span>')+'</li>';
				});htmlresTlist+='</ul><input type="button" onclick="CloseWin0(\'resTlist\');" value="�ر�" />';
				$("#resTlist").html(htmlresTlist);
			}
		},
		complete:function(){
		}
	});
};

var refreshResult=function(i){
	checkTestresult(i);
};

var getExamResult=function(i){
	var requests={"question":"GetExamResult"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html("");
			}
			if(1==err){
				var htmlreslist="";
				$("#Operateloading").html("");
				htmlreslist+='<hr style="border:1px dashed #ccc;">';
				$(ans).find("data").each(function(){
					htmlreslist+='<li style="padding-left:4px;">'+$(this).find("ename").text()+'<span style="color:#666;font-weight:normal;font-size:12px;">'+$(this).find("etime").text()+' >> �ɼ���ѡ���жϣ���</span><span style="color:red;">'+$(this).find("ecredit").text()+'</span> <a style="font-size:12px;color:#3399CC;font-weight:normal;" href="javascript:void(0);" onclick="getUserExams('+$(this).find("id").text()+');"> [�鿴]</a></li>';
				});htmlreslist+='<hr style="border:1px dashed #ccc;">';
				$("#reslist").html(htmlreslist);
			}
		},
		complete:function(){
		}
	});
};

var getUserExams=function(i){
	showForm("#Exams","#fade");
	var requests={"question":"GetExamtextUser","eid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Exams").html("������... "+htmlimgo);
		},
		error:function(e){
			alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#Exams").hide();
			}
			if(1010==err){
				var htmldata = $.base64({data:$(ans).find("answer").attr("note"),type:1});
				var htmlans = $.base64({data:$(ans).find("answer").attr("gopage"),type:1});
				var htmljud = $.base64({data:$(ans).find("answer").attr("judge"),type:1});
				var htmltext = $.base64({data:$(ans).find("answer").attr("text"),type:1});
				var htmlasel = $.base64({data:$(ans).find("answer").attr("asel"),type:1});
				var htmljsel = $.base64({data:$(ans).find("answer").attr("jsel"),type:1});
				var htmlatxt = $.base64({data:$(ans).find("answer").attr("atxt"),type:1});
				$("#Exams").html(htmldata);
				$("#tclose").html(' [<a href="javascript:void(0);" onclick="CloseWin0(\'Exams\');">�ر�</a>]');
				$("#tsubmit").html('[<a href="javascript:void(0);" onclick="CloseWin0(\'Exams\');">�ر�</a>]');
				if(htmljud!=''){
					var strjud=htmljud.split("|");
					for(var m=0;m<strjud.length;m++ ) 
					{ 
						$("#ajud"+(m+1)).html('<p style="text-decoration: underline;margin:5px;color:blue;">�𰸣���'+strjud[m]+'��</p>');
					}
				}
				if(htmlans!=''){
					var strans=htmlans.split("|");
					for(var q=0;q<strans.length;q++ ) 
					{ 
						$("#asel"+(q+1)).html('<p style="text-decoration: underline;margin:5px;color:blue;">�𰸣���'+strans[q]+'��</p>');
					}
				}
				if(htmltext!=''){
					var stratxt=htmlatxt.split("[|]");
					var strs=htmltext.split("[|]");
					var htmlexamlist='';
					for(var z=0;z<strs.length;z++ ) 
					{ 
						htmlexamlist+='<li>'+(z+1)+"��"+strs[z]+'<p style="text-decoration: underline;">������'+stratxt[z]+'</p><hr style="border:1px dashed #ccc;"></li>';
					}$("#tatext").html('<ul>'+htmlexamlist+'</ul>');
					$(".hanswer").hide();
				}
				if(htmlasel!=''){
					var strasel=htmlasel.split(";");
					for(var j=0;j<strasel.length;j++ ) 
					{ 
						$("input[name='s"+(j+1)+"']:checkbox").each(function(){ 
							$(this).attr('disabled',true);
							if (strasel[j].indexOf($(this).attr("value")) >=0){ 
								$(this).attr('checked',true);
								var Rcolor=strans[j]==$(this).attr("value")?'#01DF3A':'#FE2E2E';
								$(this).css('background-color',Rcolor);
								$(this).parent('label').css('border-bottom','2px dashed '+Rcolor);
							} 
						}); 
					}
				}
				if(htmljsel!=''){
					var strjsel=htmljsel.split(";");
					for(var k=0;k<strjsel.length;k++ ) 
					{ 
						$("input[name='p"+(k+1)+"']:radio").each(function(){ 
							$(this).attr('disabled',true);
							if (strjsel[k].indexOf($(this).attr("value")) >=0){ 
								$(this).attr('checked',true);
								var Jcolor=strjud[k]==$(this).attr("value")?'#01DF3A':'#FE2E2E';
								$(this).css('background-color',Jcolor);
								$(this).parent('label').css('border-bottom','2px dashed '+Jcolor);
							} 
						}); 
					}
				}
			}
		},
		complete:function(){
		}
	});
};

var checkExams=function(i){
	showForm("#Exams","#fade");
	var requests={"question":"GetExamtextTeach","eid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Exams").html("���ؿ�����... "+htmlimgo);
		},
		error:function(e){
			alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				CloseWin0('Exams');
			}
			if(1010==err){
				var htmldata = $.base64({data:$(ans).find("answer").attr("note"),type:1});
				var htmlans = $.base64({data:$(ans).find("answer").attr("gopage"),type:1});
				var htmljud = $.base64({data:$(ans).find("answer").attr("judge"),type:1});
				var htmltext = $.base64({data:$(ans).find("answer").attr("text"),type:1});
				$("#Exams").html(htmldata);
				$("#tclose").html(' [<a href="javascript:void(0);" onclick="CloseWin0(\'Exams\');">�ر�</a>]');
				$("#tsubmit").html('[<a href="javascript:void(0);" onclick="CloseWin0(\'Exams\');">�ر�</a>]');
				if(htmltext!=''){
					var strs=htmltext.split("[|]");
					var htmlexamlist='';
					for(var z=0;z<strs.length;z++ ) 
					{ 
						htmlexamlist+='<li>'+(z+1)+"��"+strs[z]+'<hr style="border:1px dashed #ccc;"></li>';
					}$("#tatext").html('<ul>'+htmlexamlist+'</ul>');
					$(".hanswer").hide();
				}
				if(htmlans!=''){
					var stra=htmlans.split("|");
					for(var j=0;j<stra.length;j++ ) 
					{ 
						$("input[name='s"+(j+1)+"']:checkbox").each(function(){ 
							$(this).attr('disabled',true);
							if (stra[j].indexOf($(this).attr("value")) >=0){ 
								$(this).attr('checked',true);
								$(this).css('background-color','#01DF3A');
								$(this).parent('label').css('border-bottom','2px dashed #01DF3A');
							} 
						}); 
					}
				}
				if(htmljud!=''){
					var strj=htmljud.split("|");
					for(var k=0;k<strj.length;k++ ) 
					{ 
						$("input[name='p"+(k+1)+"']:radio").each(function(){ 
							$(this).attr('disabled',true);
							if (strj[k].indexOf($(this).attr("value")) >=0){ 
								$(this).attr('checked',true);
								$(this).css('background-color','#01DF3A');
								$(this).parent('label').css('border-bottom','2px dashed #01DF3A');
							} 
						}); 
					}
				}
			}
		},
		complete:function(){
		}
	});
};

var CloseWin0=function(i){
	hideForm("#"+i,"null");
};

var GetExamtext=function(){
	var requests={"question":"GetExamtext","eid":eid};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Exams").html("���ؿ�����... "+htmlimgo);
			ExamTimeLimit=0;
		},
		error:function(e){
			alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				ExamTimeLimit=$(ans).find("answer").attr("limit");
				var htmltimer='<script>$(function(){timer('+ExamTimeLimit+','+$(ans).find("answer").attr("counts")+','+$(ans).find("answer").attr("countj")+','+$(ans).find("answer").attr("counta")+');});</script>'+(0<ExamTimeLimit?'<div class="time-item"><strong id="hour_show">0ʱ</strong><strong id="minute_show">0��</strong><strong id="second_show">0��</strong></div>':'');
				var htmldata = $.base64({data:$(ans).find("answer").attr("note"),type:1});
				var anscount=$(ans).find("answer").attr("gopage").split("|");
				$("#Exams").html(htmltimer+htmldata);
				changArrange(parseInt(anscount[0]),parseInt(anscount[1]));
			}
		},
		complete:function(){
		}
	});
};

var TodoTeachExam=function(){
	var ExamKey=$("input[name='exam']:checked").val(); 
	var requests={"question":"TodoTeachExam","eid":ExamKey};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submitoperate").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html('<span style="color:red;">��ѡ��һ����Ŀ��</span>');
				$("#submitoperate").attr("disabled",false);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				alert($(ans).find("answer").attr("note"));
				todotest();
			}
		},
		complete:function(){
		}
	});
};

var todofinish=function(){
	var htmlOperate="";
	htmlOperate+='<li style="font-size:14px;color:#ff0000;font-weight:bold;line-height:35px;" >�Ƿ����ɵ�ǰ��<span id="Getcontent" style="color:blue;"></span>�ڿΣ�</li>';
	htmlOperate+='<li>��ȷ�Ϻ��ÿγ̽��Ƚ��ƽ�һ�գ�ͬʱ�������տγ̣�</li>';
	htmlOperate+='<li>��ע��<textarea cols="41" id="OperateComment" style="width:70%; height: 24px"></textarea></li><hr>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="TodoTeachFinish();" value="ȷ��" /> <input name="cancel" onclick="CloseWin(\'Operate\');" type="button" value="ȡ��" /> <span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
	GetTeachFinish();
};

var GetTeachFinish=function(){
	var requests={"question":"GetTeachFinish"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#Operateloading").html("");
				$("#Getcontent").html('��'+$(ans).find("answer").attr("note")+'����'+$(ans).find("answer").attr("gopage")+'��');
			}
		},
		complete:function(){
		}
	});
};

var TodoTeachFinish=function(){
	var comm=$("#OperateComment").val();
	var requests={"question":"TodoTeachFinish","comm":comm};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submitoperate").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				hideForm("#Operate","#fade");
				topTeachMain();
			}
		},
		complete:function(){
		}
	});
};

var tododesk=function(){
	showForm("#Position","#fade");
	var requests={"question":"GetTodoDesk"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Position").html('���ڼ�����λͼ...'+htmlimgo+' <input type="button" onclick="CloseWin(\'Position\');" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Position","#fade");
			}
			if(1010==err){
				$("#Position").html('<script>MoveSeated('+$(ans).find("answer").attr("class")+','+$(ans).find("answer").attr("gopage")+');</script><div style="float:right;">[ <a href="javascript:void(0);" style="font-size:14px;color:blue;"onclick="CloseWin(\'Position\');">�ر�</a> ] </span></div></li><hr style="border:1px dashed #ccc;">'+$.base64({data:$(ans).find("answer").attr("note"),type:1})+'<br/><div style="float:right;">[ <a href="javascript:void(0);" style="font-size:14px;color:blue;"onclick="CloseWin(\'Position\');">�ر�</a> ] </span></div><hr style="border:1px dashed #ccc;">');
			}
		},
		complete:function(){
		}
	});
};

var todovideo=function(){
	showForm("#video","#fade");
	var requests={"question":"GetVideoList"};
	var htmldata="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#video").html("���ڼ�����Ƶ�б�..."+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin(\'video\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#video","#fade");
			}
			if(1010==err){
				lovurl=$(ans).find("answer").attr("gopage");
				htmldata=!$.base64({data:$(ans).find("answer").attr("note"),type:1})?"":$.base64({data:$(ans).find("answer").attr("note"),type:1});
				$("#video").html('<div style="float:right;">[<a href="javascript:void(0);" onclick="CloseWin(\'video\');">�ر�</a>]<span style="color:#999">������ѧ�����磩</span></div><hr>'+htmldata+'<hr>');
			}
		},
		complete:function(){
		}
	});
};

var todoweekly=function(){
	showForm("#Operate2","#fade");
	var requests={"question":"GetWeekly"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate2").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operate").html("");
			}
			if(1==err){
				var htmlreslist="";
				$("#Operate2").html("");
				htmlreslist+='<hr style="border:1px dashed #ccc;"><span style="color:blue;">��ǰ�γ̡�<b>'+$(ans).find("answer").attr("cname")+'</b>��</span><input type="button" value=" ��д/�޸��ܱ� " onclick="WriteWeekly();" /><span style="color:red;">������ʵ���ڿν��Ȳ���������֪��ʦ�ƽ��ڿν��ȣ�</span><hr style="border:1px dashed #ccc;">';
				if(0==$(ans).find("data").size())htmlreslist+='<span style="color:#666;padding-left:3px;">��ǰû���ܱ���¼��</span>';
				else{
					$(ans).find("data").each(function(){
						htmlreslist+='<li style="padding-left:3px;line-height:18px;">'+$(this).find("wcourse").text()+'��'+$(this).find("wDate").text()+'�����ܱ� <span style="color:#999;font-weight:normal;font-size:12px;">'+$(this).find("wtime").text()+'</span> <a style="color:blue;" href="javascript:void(0);" onclick="ShowWeekly('+$(this).attr("id")+');">[�鿴]</a></li>';
					});
				}htmlreslist+='<hr style="border:1px dashed #ccc;"><a href="javascript:void(0);" onclick="CloseWin(\'Operate2\');">[�ر�]</a>';
				$("#Operate2").html(htmlreslist);
			}
		},
		complete:function(){
		}
	});
};

var ShowWeekly=function(i){
	showForm("#Eval","#fade");
	var requests={"question":"ShowWeekly","wid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Eval").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin0(\'Eval\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				hideForm("#Eval","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				var wtype=$(ans).find("answer").attr("note");
				var htmldata='<div style="font-size:16px;text-align:center;">'+$(ans).find("answer").attr("gopage")+'�ܱ�</div><hr style="border:1px dashed #ccc;"><br/><div>';
				switch(wtype){
					case "1":
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">�������յ�֪ʶ�㣺</label><textarea cols="41" id="s1" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s1"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">ģ��������֪ʶ�㣺</label><textarea cols="41" id="s2" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s2"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">û�����յ�֪ʶ�㣺</label><textarea cols="41" id="s3" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s3"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">��������ѧϰ�ĵã�</label><textarea cols="41" id="s4" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("s4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s4"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�����������˷�ʡ��</label><textarea cols="41" id="s5" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("s5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s5"),type:1}))+'</textarea></div><br/>';
					break;
					case "2":
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">���������з���Ա��</label><textarea cols="41" id="p1" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p1"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">����������Ŀ���ƣ�</label><textarea cols="41" id="p2" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p2"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">����������Ŀ���飺</label><textarea cols="41" id="p3" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p3"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">���������������⣺</label><textarea cols="41" id="p4" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p4"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">������������������</label><textarea cols="41" id="p5" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p5"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">���������з����ȣ�</label><textarea cols="41" id="p6" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("p6"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p6"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�������������ܽ᣺</label><textarea cols="41" id="p7" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("p7"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p7"),type:1}))+'</textarea></div><br/>';
					break;
				}htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�����������˽��飺</label><textarea cols="41" id="z" style="width:80%; height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("z"),type:1})?"":$.base64({data:$(ans).find("answer").attr("z"),type:1}))+'</textarea></div><br/>';
				htmldata+='</div><hr style="border:1px dashed #ccc;"><div style="text-align:center;">'+($(ans).find("answer").attr("edit")==1?'<input onclick="submitWeekly(0);" type="button" value=" ���ݸ� " /> <input onclick="submitWeekly(1);" type="button" value=" ���沢�ر� " /> ':'')+'<input name="cancel" onclick="CloseWin0(\'Eval\');" type="button" value=" �ر� " /> <span id="OperateloadingW"></span></div>';
				$("#Eval").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var todogweekly=function(){
	showForm("#Operate2","#fade");
	var requests={"question":"GetGWeekly"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate2").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operate2").html("");
			}
			if(1==err){
				var htmlreslist='<hr style="border:1px dashed #ccc;">';
				$("#Operate").html("");
				if(0==$(ans).find("data").size())htmlreslist+='<span style="color:#666;padding-left:3px;">�ð༶û���ܱ���¼��</span>';
				else{
					$(ans).find("data").each(function(){
						htmlreslist+='<li style="line-height:18px;"><span style="color:#61380B;font-size:13px;">�� '+$(this).find("gctype").text()+'</span>��'+$(this).find("gcourse").text()+'��'+$(this).find("gDate").text()+'�����ܱ� <span style="color:#666;font-weight:normal;font-size:12px;">'+$(this).find("gtime").text()+'</span> <a style="color:blue;" href="javascript:void(0);" onclick="Showgweekly('+$(this).attr("id")+');">[�鿴]</a></li>';
					});
				}htmlreslist+='<hr style="border:1px dashed #ccc;"><input type="button" onclick="CloseWin(\'Operate2\');" value="�ر�" />';
				$("#Operate2").html(htmlreslist);
			}
		},
		complete:function(){
		}
	});
};

var Showgweekly=function(i){
	showForm("#Weeklys","#fade");
	var requests={"question":"ShowGweekly","gid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Weeklys").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin0(\'Weeklys\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				hideForm("#Weeklys","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1==err){
				var gtype=$(ans).find("answer").attr("gtype");
				var htmldata='[<a style="color:blue;" href="javascript:void(0);" onclick=CloseWin0(\'Weeklys\');>�ر�</a>]<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;background-color:#FFF;">';
				switch(gtype){
					case "1":
						htmldata+='<tr><th colspan="9" style="height:30px;"><p style="font-size:16px;line-height:35px;font-weight:bold;">��Ÿ3GѧԺѧԱ�ܱ����ܣ�<u>'+$(ans).find("answer").attr("gtypename")+'</u>��</p><span style="margin-left:20px;font-size:14px;">�༶��<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("class")+'</u></span><span style="margin-left:20px;">���ڣ�<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("gdate")+'</u></span><span style="margin-left:20px;">��ʦ��<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("teacher")+'</u></span><span style="margin-left:20px;">�γ̣�<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("course")+'</u></span></th></tr><tr style="font-weight:bold;line-height:20px;"> ';
		      	htmldata+='<td width="4%" style="background-color:#eee;">ѧ��</td>';
		      	htmldata+='<td width="8%" style="background-color:#eee;">����</td>';
		      	htmldata+='<td width="15%" style="background-color:#eee;">���յ�֪ʶ��</td>';
		      	htmldata+='<td width="15%" style="background-color:#eee;">ģ��������֪ʶ��</td>';
		      	htmldata+='<td width="15%" style="background-color:#eee;">û�����յ�֪ʶ��</td>';
		      	htmldata+='<td width="15%" style="background-color:#eee;">ѧϰ�ĵ�</td>';
		       	htmldata+='<td width="13%" style="background-color:#eee;">���˷�ʡ</td>';
		      	htmldata+='<td width="15%" style="background-color:#eee;">���˽���</td>';
		      	$(ans).find("data").each(function(){
							htmldata+='<tr style="line-height:20px;word-break:break-all;"><td><span style="font-color:#CCCCCC;">'+$(this).find("num").text()+'</span></td><td>'+$(this).find("name").text()+'</td><td>'+($(this).find("s1").text()==""?"-":$.base64({data:$(this).find("s1").text(),type:1}))+'</td><td>'+($(this).find("s2").text()==""?"-":$.base64({data:$(this).find("s2").text(),type:1}))+'</td><td>'+($(this).find("s3").text()==""?"-":$.base64({data:$(this).find("s3").text(),type:1}))+'</td><td>'+($(this).find("s4").text()==""?"-":$.base64({data:$(this).find("s4").text(),type:1}))+'</td><td>'+($(this).find("s5").text()==""?"-":$.base64({data:$(this).find("s5").text(),type:1}))+'</td><td>'+($(this).find("z").text()==""?"-":$.base64({data:$(this).find("z").text(),type:1}))+'</td></tr>';
						});
					break;
					case "2":
						htmldata+='<tr><th colspan="10" style="height:30px;"><p style="font-size:16px;line-height:35px;font-weight:bold;">��Ÿ3GѧԺѧԱ�ܱ����ܣ�<u>'+$(ans).find("answer").attr("gtypename")+'</u>��</p><span style="margin-left:20px;font-size:14px;">�༶��<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("class")+'</u></span><span style="margin-left:20px;">���ڣ�<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("gdate")+'</u></span><span style="margin-left:20px;">��ʦ��<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("teacher")+'</u></span><span style="margin-left:20px;">�γ̣�<span style="color:#319fcc;"><u>'+$(ans).find("answer").attr("course")+'</u></span></th></tr><tr style="font-weight:bold;line-height:20px;"> ';
						htmldata+='<td width="6%" style="background-color:#eee;">ѧ��</td>';
		      	htmldata+='<td width="8%" style="background-color:#eee;">����</td>';
		      	htmldata+='<td width="10%" style="background-color:#eee;">�з���Ա</td>';
		      	htmldata+='<td width="10%" style="background-color:#eee;">��Ŀ����</td>';
		      	htmldata+='<td width="10%" style="background-color:#eee;">��Ŀ����</td>';
		      	htmldata+='<td width="10%" style="background-color:#eee;">����������</td>';
		       	htmldata+='<td width="12%" style="background-color:#eee;">��������</td>';
		      	htmldata+='<td width="10%" style="background-color:#eee;">�з�����</td>';
		      	htmldata+='<td width="12%" style="background-color:#eee;">�ܽ�</td>';
		      	htmldata+='<td width="12%" style="background-color:#eee;">���˽���</td>';
		      	$(ans).find("data").each(function(){
							htmldata+='<tr style="line-height:20px;word-break:break-all;"><td>'+$(this).find("num").text()+'</td><td>'+$(this).find("name").text()+'</td><td>'+($(this).find("p1").text()==""?"-":$.base64({data:$(this).find("p1").text(),type:1}))+'</td><td>'+($(this).find("p2").text()==""?"-":$.base64({data:$(this).find("p2").text(),type:1}))+'</td><td>'+($(this).find("p3").text()==""?"-":$.base64({data:$(this).find("p3").text(),type:1}))+'</td><td>'+($(this).find("p4").text()==""?"-":$.base64({data:$(this).find("p4").text(),type:1}))+'</td><td>'+($(this).find("p5").text()==""?"-":$.base64({data:$(this).find("p5").text(),type:1}))+'</td><td>'+($(this).find("p6").text()==""?"-":$.base64({data:$(this).find("p6").text(),type:1}))+'</td><td>'+($(this).find("p7").text()==""?"-":$.base64({data:$(this).find("p7").text(),type:1}))+'</td><td>'+($(this).find("z").text()==""?"-":$.base64({data:$(this).find("z").text(),type:1}))+'</td></tr>';
						});
						break;
				}htmldata+='</table>';
				htmldata+='<br><div style="text-align:center;"><input name="cancel" onclick="CloseWin0(\'Weeklys\');" type="button" value=" �ر� " /></div>';
				$("#Weeklys").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var WriteWeekly=function(){
	showForm("#Eval","#fade");
	var requests={"question":"GetWriteWeekly"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Eval").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				hideForm("#Eval","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				var wtype=$(ans).find("answer").attr("note");
				var htmldata='<div style="font-size:16px;text-align:center;">'+$(ans).find("answer").attr("gopage")+'�ܱ�</div><hr style="border:1px dashed #ccc;"><br/><div>';
				switch(wtype){
					case "1":
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">�������յ�֪ʶ�㣺</label><textarea cols="41" id="s1" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s1"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">ģ��������֪ʶ�㣺</label><textarea cols="41" id="s2" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s2"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:48px;"><label style="float:left;">û�����յ�֪ʶ�㣺</label><textarea cols="41" id="s3" style="width:80%;height: 48px">'+(!$.base64({data:$(ans).find("answer").attr("s3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s3"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">��������ѧϰ�ĵã�</label><textarea cols="41" id="s4" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("s4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s4"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�����������˷�ʡ��</label><textarea cols="41" id="s5" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("s5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s5"),type:1}))+'</textarea></div><br/>';
					break;
					case "2":
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">���������з���Ա��</label><textarea cols="41" id="p1" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p1"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">����������Ŀ���ƣ�</label><textarea cols="41" id="p2" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p2"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">����������Ŀ���飺</label><textarea cols="41" id="p3" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p3"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">���������������⣺</label><textarea cols="41" id="p4" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p4"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:38px;"><label style="float:left;">������������������</label><textarea cols="41" id="p5" style="width:80%;height: 38px">'+(!$.base64({data:$(ans).find("answer").attr("p5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p5"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">���������з����ȣ�</label><textarea cols="41" id="p6" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("p6"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p6"),type:1}))+'</textarea></div><br/>';
						htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�������������ܽ᣺</label><textarea cols="41" id="p7" style="width:80%;height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("p7"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p7"),type:1}))+'</textarea></div><br/>';
					break;
				}htmldata+='<div style="padding-left:10px;line-height:28px;"><label style="float:left;">�����������˽��飺</label><textarea cols="41" id="z" style="width:80%; height: 28px">'+(!$.base64({data:$(ans).find("answer").attr("z"),type:1})?"":$.base64({data:$(ans).find("answer").attr("z"),type:1}))+'</textarea></div><br/>';
				htmldata+='</div><hr style="border:1px dashed #ccc;"><div style="text-align:center;"><input onclick="submitWeekly(0);" type="button" value=" ���ݸ� " /> <input onclick="submitWeekly(1);" type="button" value=" ���沢�ر� " /> <input name="cancel" onclick="CloseWin0(\'Eval\');" type="button" value=" �ر� " /> <span id="OperateloadingW"></span></div>';
				$("#Eval").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var submitWeekly=function(k){
	var s1=$("#s1").val();
	var s2=$("#s2").val();
	var s3=$("#s3").val();
	var s4=$("#s4").val();
	var s5=$("#s5").val();
	var p1=$("#p1").val();
	var p2=$("#p2").val();
	var p3=$("#p3").val();
	var p4=$("#p4").val();
	var p5=$("#p5").val();
	var p6=$("#p6").val();
	var p7=$("#p7").val();
	var z=$("#z").val();
	var requests={"question":"SubmitWeekly","s1":s1,"s2":s2,"s3":s3,"s4":s4,"s5":s5,"p1":p1,"p2":p2,"p3":p3,"p4":p4,"p5":p5,"p6":p6,"p7":p7,"z":z};
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OperateloadingW").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(1010==err){
				todoweekly();
				$("#OperateloadingW").html("");
				if(0<k)CloseWin0('Eval');
			}
		},
		complete:function(){
		}
	});
};

var todorules=function(){
	showForm("#Operate2","#fade");
	var requests={"question":"GetRules"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate2").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmlreslist='<hr style="border:1px dashed #ccc;">';
				$("#Operate").html("");
				if(0<$(ans).find("studycredit").size()){
					var colorCreditA=colorCreditD='Green';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					htmlreslist+='<span style="font-size:14px;font-weight:bold;padding:2px 7px 2px 7px;color:#FFF;background-color:'+colorCreditA+';border-radius:5px;">����'+creditA+'</span> <span style="font-size:14px;font-weight:bold;padding:2px 7px 2px 7px;color:#FFF;background-color:'+colorCreditD+';border-radius:5px;">����'+creditD+'</span><hr style="border:1px dashed #eee;"><span style="color:#999;">ע������80�֣��������Ϻϸ���60-79���棬60�����²����񣻼���80�֣��������Ϻϸ���60-69���棬60�����²�������</span><hr style="border:1px dashed #ccc;">';
				}
				if(0==$(ans).find("data").size())htmlreslist+='<span style="color:green;padding-left:3px;line-height:26px;font-size:15px;">���ı��ֺܺã�Ŀǰ��û���κ�Υ�ͼ�¼������Ŭ����</span>';
				else{
					htmlreslist+='<span style="color:blue;font-size:14px;line-height:26px;">��������Υ�ͼ�¼��</span>';
					$(ans).find("data").each(function(){
						htmlreslist+='<li style="line-height:18px;"><span style="font-weight:bold;color:#333;font-size:13px;">'+$(this).find("rtime").text()+'</span> <span style="color:red;font-weight:bold;font-size:13px;">'+$(this).find("rname").text()+'</span> <span style="color:#666;font-weight:normal;font-size:13px;"> >>> '+$(this).find("rcomment").text()+'</span></li>';
					});
				}htmlreslist+='<hr style="border:1px dashed #ccc;"><input type="button" onclick="CloseWin(\'Operate2\');" value="�ر�" />';
				$("#Operate2").html(htmlreslist);
			}
		},
		complete:function(){
		}
	});
};

var gotostudent=function(){
	gotoWhere(ClassP,1);
};

var gotoDoc=function(c,d){
	if(c==0&&d==0){
		var htmlOperate="";
		htmlOperate+='<li style="text-align:center;font-size:14px;font-weight:bold;line-height:35px;color:blue;" >�ð༶Ŀǰ���Ȳ��������ڿη����ڣ�</li><hr>';
		htmlOperate+='<li style="text-align:center;"><a href="javascript:void(0);"><img src="images/change.png" border=0 style="width:20px;height:20px;" alt="�л��༶" onclick="changeClass();" /></a> <input onclick="changeClass();" type="button" value="�л��༶" /><hr style="border:1px dashed #ccc;"><input name="cancel" onclick="CloseWin(\'Operate\');" type="button" value=" ֪���ˣ��鿴�γ� " />&nbsp;&nbsp;&nbsp;<input id="submitoperate" name="input" type="button" onclick="gotostudent();" value=" ����ѧ����ѯ " /> <span id="Operateloading"></span><hr></li>';
		$("#Operate").html(htmlOperate);
		showForm("#Operate","#fade");
	}else{
		$(".dlist li").removeClass();
		var requests={"question":"GetTeachDoc","cid":c,"did":d};
		var htmlmsg="";
			$.ajax({
			type:'POST',
			url:TeachUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
				loadings("s");
			},
			error:function(e){
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=plusP+$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(2001==err){
					alert("��Ǹ�����տγ̻�û�п��ţ�");
					loadings("h");
					GetTeachMenu();
				}
				if(1010==err){
					var frameheight=$("#caidan").height()-90;
					var middlewidth=($(".middle").width()-180)*0.96;
					if((frameheight/3*4) > middlewidth){
						framewidthv=middlewidth-3;
						frameheightv=middlewidth/4*3;
					}else{
						frameheightv=frameheight;
						framewidthv=frameheight/3*4;
					}
					$("#menua_con").css("width",middlewidth);
					var htmlmenudoc='<li><A class="nava_on" id="mynava0" onclick="javascript:qiehuana(0);" href="javascript:void(0);"><SPAN>�γ�����</SPAN></A></li><li><a href="javascript:void(0);" onClick="javascript:qiehuana(1)" id="mynava1" class="nava_off"><span>�μ�</span></a></li><li><a href="javascript:void(0);" onClick="javascript:qiehuana(2)" id="mynava2" class="nava_off"><span>��ҵ</span></a></li><li><a href="javascript:void(0);" onClick="javascript:qiehuana(3)" id="mynava3" class="nava_off"><span>��Ƶ</span></a></li><li><a href="javascript:void(0);" onClick="javascript:qiehuana(4)" id="mynava4" class="nava_off"><span>����</span></a></li>';
					var htmlware=$(ans).find("answer").attr("cware")==""?'<span style="font-size:14px;color:#CCC;">�� �����޿μ�����ʱδ����...</span>':'<iframe src="'+$(ans).find("answer").attr("cware")+'" scrolling="auto" width='+middlewidth+' height='+frameheight+'></iframe>';
					var htmldocs=$(ans).find("answer").attr("cdocs")==""?'<span style="font-size:14px;color:#CCC;">�� ��������ҵ����ʱδ����...</span>':'<iframe src="'+$(ans).find("answer").attr("cdocs")+'" scrolling="auto" width='+middlewidth+' height='+frameheight+'></iframe>';
					var htmlvideo=$(ans).find("answer").attr("cvideo")==""?'<span style="font-size:14px;color:#CCC;">�� ��������Ƶ����ʱδ����...</span>':'<a class="mediavedio" href="'+$(ans).find("answer").attr("cvideo")+'"></a><script type="text/javascript">$(".mediavedio").media({ width: '+framewidthv+', height: '+frameheightv+', autoplay: true,overflow: scroll});</script>';
					var htmlwork=$(ans).find("answer").attr("cwork")==""?'<span style="font-size:14px;color:#CCC;">�� ���������ػ���ʱδ����...</span>':'��  ���տγ������������� >>> <a style="color:blue;" href="'+$(ans).find("answer").attr("cwork")+'">[��������]</a>';
					var htmltododoc='<div id=qha_con0 style="DISPLAY:block"><span style="font-size:21px;font-family:Microsoft YaHei;">�� '+$(ans).find("answer").attr("ctitle")+'</span></div><div id=qha_con1 style="DISPLAY:none">'+htmlware+'</div><div id=qha_con2 style="DISPLAY:none">'+htmldocs+'</div><div id=qha_con3 style="DISPLAY:none">'+htmlvideo+'</div><div id=qha_con4 style="DISPLAY:none">'+htmlwork+'</div>';
					loadings("h");
					$("#"+c+"li"+d).addClass("curday");
					$("#nava").html(htmlmenudoc);
					$("#menua_con").html(htmltododoc);
				}
			},
			complete:function(){
			}
		});
	}
};

var todogbooks=function(){
	showForm("#Eval","#fade");
	var requests={"question":"GetStudyBooks"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Eval").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin(\'Eval\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var frameheight=$(window).height()*0.9;
				var middlewidth=$("#Eval").width();
				var htmldata='<div style="text-align:right;"><input name="cancel" onclick="CloseWin(\'Eval\');" type="button" value="�ر�" /></div>';
				htmldata+='<div><iframe src="'+$(ans).find("answer").attr("note")+'" scrolling="auto" width='+middlewidth+' height='+frameheight+'></iframe>';
				htmldata+='</div><div style="text-align:center;"><input name="cancel" onclick="CloseWin(\'Eval\');" type="button" value=" �ر� " /></div>';
				$("#Eval").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var menus=function(i){
	$(".cnemu").slideUp(); 
	$("#dd"+i).slideDown(); 
	$(".on").attr("class", ""); 
	$("#dl"+i).attr("class", "on"); 
};

var ChangePwdInitStu=function(){
	$("#errmsginit").empty();
	var password=$("#passwordinit").attr("value");
	var confirmpsw=$("#confirmpswinit").attr("value");
	var err=0;
	if(""==password){
		$("#errmsginit").html("�����������룡");
		$("#passwordinit").focus();
		err++;
	}
	else if(confirmpsw!=password){
		$("#errmsginit").html("�����������벻һ�£�");
		$("#passwordinit").attr("value","");
		$("#confirmpswinit").attr("value","");
		$("#passwordinit").focus();
		err++;
	}
	if(0==err){
		var requests={"question":"ChangePwd","password":password,"confirmpsw":confirmpsw};
		$.ajax({
		type:'POST',
			url:TeachUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
				loadings("s");
			},
			error:function(e){
				//alert('e');
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=plusP+$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(3000==err){
					$("#errmsginit").html($(ans).find("answer").attr("note"));
					loadings("h");
					$("#passwordinit").attr("value","");
					$("#confirmpswinit").attr("value","");
					$("#passwordinit").focus();
				}
				if(1010==err){
					loadings("h");
					topTeachMain();
				}
			},
			complete:function(){
			}
		});
	}
};

var checkTeachset=function(){
	var requests={"question":"CheckTeachSet"};
	var htmlset="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#set").html(htmlimgo);
			$("#set").fadeIn();
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var connect='<ul style="line-height:24px;">'+("S"==$(ans).find("answer").attr("type")?"<li>ѧ���ţ�"+$(ans).find("answer").attr("user")+"</li>":"<li>�ֻ��ţ�"+$(ans).find("answer").attr("user")+"</li><li>Email��"+$(ans).find("answer").attr("email")+"</li>");
				var last = $(ans).find("answer").attr("last");
				var lastip = $(ans).find("answer").attr("lastip");
				var htmlset=connect+'<ul style="line-height:24px;"><li>�ϴε�½ʱ�䣺'+last+'</li><li>�ϴε�½IP��'+lastip+'</li></ul><hr><li>�޸ĵ�½����</li><li id="errmsg" style="color:red;"></li><li>�µ����룺<input type="password" id="password" size="15" /></li><li>����ȷ�ϣ�<input type="password" id="confirmpsw" size="15" /></li><hr><li><input type="button" value="�޸�" onclick="ChangeTeachPwd();" /> <input type="button" value="�ر�" onclick="CloseOver(\'set\');" /></li></ul>';
				$("#set").html(htmlset);
				$("#password").keypress(function(e){
					if('13'==e.keyCode){
						$("#confirmpsw").focus();
					}
				});
				$("#confirmpsw").keypress(function(e){
					if('13'==e.keyCode){
						ChangeTeachPwd();
					}
				});
			}
		},
		complete:function(){
		}
	});
};

var ChangeTeachPwd=function(){
	$("#errmsg").empty();
	var password=$("#password").attr("value");
	var confirmpsw=$("#confirmpsw").attr("value");
	var err=0;
	if(""==password){
		$("#errmsg").html("�����������룡");
		$("#password").focus();
		err++;
	}
	else if(confirmpsw!=password){
		$("#errmsg").html("�����������벻һ�£�");
		$("#password").attr("value","");
		$("#confirmpsw").attr("value","");
		$("#password").focus();
		err++;
	}
	if(0==err){
		var requests={"question":"ChangePwd","password":password,"confirmpsw":confirmpsw};
		$.ajax({
		type:'POST',
			url:TeachUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
				loadings("s");
			},
			error:function(e){
				//alert('e');
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(3000==err){
					$("#errmsg").html($(ans).find("answer").attr("note"));
					loadings("h");
					$("#password").attr("value","");
					$("#confirmpsw").attr("value","");
					$("#password").focus();
				}
				if(1010==err){
					loadings("h");
					CloseOver('set');
				}
			},
			complete:function(){
			}
		});
	}
};

var CloseOver=function(a){
	$("#"+a).hide();
}

var teachlogout=function(){
	var requests={"question":"Logout"};
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(1==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
		},
		complete:function(){
		}
	});
};

var submitExam=function(q,p,z){
	var arrChk=arrJud=arrInp="";
	for(var i=1;i<=q;i++){
		$("input[name='s"+i+"']:checked").each(function(){arrChk+=this.value;});
		arrChk+=";";
	}
	for(var k=1;k<=p;k++){
		$("input[name='p"+k+"']:checked").each(function(){arrJud+=this.value;});
		arrJud+=";";
	}
	if(0<$("#tatext").length){
		for(var j=1;j<=z;j++){
			arrInp+=$("#d"+j).val()+"[|]";
		}
	}
	var requests={"question":"SubmitExamOver","eid":eid,"selstr":arrChk,"judstr":arrJud,"inpstr":arrInp.substring(0,arrInp.length-3)};
	var htmlset="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#oploading").html(htmlimgo+'<span style="color:#999;">...ת��̫����,��Ҫ�ر��ң����������磬�������粻�У���ȥ�����ܴ��磡</span>');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#oploading").html("");
				alert($(ans).find("answer").attr("note"));
				hideForm("#Exams","#fade");
			}
			if(1010==err){
				$("#oploading").html("");
				alert("�ύ�ɹ��������Բ鿴�ɼ������ȴ�֪ͨ!");
				hideForm("#Exams","#fade");
				todotest();
			}
		},
		complete:function(){
		}
	});
};

var changArrange=function(k,l){
	for(var i=0;i < 20;i++){
		var slabel0 = $('#ulsel'+(getRandom(1,Math.floor(k/2))));
		var slabel1 = $('#ulsel'+(getRandom(Math.floor(k/2)+1,k)));
		var sel0 = slabel0.html();
		var sel1 = slabel1.html();
		slabel0.html(sel1);
		slabel1.html(sel0);
		var jlabel0 = $('#uljud'+(getRandom(1,Math.floor(l/2))));
		var jlabel1 = $('#uljud'+(getRandom(Math.floor(l/2)+1,l)));
		var jud0 = jlabel0.html();
		var jud1 = jlabel1.html();
		jlabel0.html(jud1);
		jlabel1.html(jud0);
	}
};

var getRandom=function(x,y){
	return parseInt(Math.random() * (y - x + 1) + x);
};

var todoeval=function(){
	showForm("#Eval","#fade");
	var requests={"question":"GetTeachEval"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Eval").html("���ص�����... "+htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				hideForm("#Eval","#fade");
				alert("��ǰû�п����Խ�ʦ�����ۻ��Ѿ��������ۣ�");
			}
			if(1010==err){
				var htmldata = $.base64({data:$(ans).find("answer").attr("note"),type:1});
				$("#Eval").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var todoocceval=function(){
	showForm("#Eval","#fade");
	var requests={"question":"GetTeachOccEval"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Eval").html("����ְҵ�滮ʦ������... "+htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				hideForm("#Eval","#fade");
				alert("��ǰû�п�����ְҵ�滮ʦ�����ۻ��Ѿ��������ۣ�");
			}
			if(1010==err){
				var htmldata = $.base64({data:$(ans).find("answer").attr("note"),type:1});
				$("#Eval").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var submitEval=function(){
	var val="";
	for(var i = 1;i<=20;i++){
		val+=('undefined'==typeof($("input[name=radio"+i+"]:checked").val())?0:$("input[name=radio"+i+"]:checked").val())+"|";
	}val = val.substr(0,val.length-1);
	var suggest1 = $("#suggest1").val();
	var suggest2 = $("#suggest2").val();
	var suggest3 = $("#suggest3").val();
	var requests={"question":"SubmitTeachEval","vals":val,"s1":suggest1,"s2":suggest2,"s3":suggest3};
	$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OperateloadingEval").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#OperateloadingEval").html("");
			}
			if(1010==err){
				alert("�ύ�ɹ�����л���Խ�ʦ�����ۣ�");
				hideForm("#Eval","#fade");
			}
		},
		complete:function(){
		}
	});
};

var submitOccEval=function(){
	var occval="";
	for(var i = 1;i<=20;i++){
		occval+=('undefined'==typeof($("input[name=occradio"+i+"]:checked").val())?0:$("input[name=occradio"+i+"]:checked").val())+"|";
	}occval = occval.substr(0,occval.length-1);
	var suggest1 = $("#occsuggest1").val();
	var suggest2 = $("#occsuggest2").val();
	var requests={"question":"SubmitTeachOccEval","vals":occval,"s1":suggest1,"s2":suggest2};
	$.ajax({
		type:'POST',
		url:TeachUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OperateloadingEval").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=plusP+$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#OperateloadingEval").html("");
			}
			if(1010==err){
				alert("�ύ�ɹ�����л����ְҵ�滮ʦ�����ۣ�");
				hideForm("#Eval","#fade");
			}
		},
		complete:function(){
		}
	});
};

var GetVideoUrlList=function(v){
	var ul = $("#"+v).next();
	if($(ul).css("display") == "none"){
		$(ul).siblings("ul").hide();
		$(ul).show();
	}else $(ul).hide();
};

var GetVideoEUrl=function(v){
	var oh2 = $("#"+v).parent().attr("id").replace("l","");
	var oli = $("#"+v).attr("id").replace("l"+oh2,"");
	var oln = $("#"+v).html();
	$("#videoU").html(oln+' [<a href="javascript:void(0);" onclick=CloseWin0("videoU");>�ر�</a>]<a class="mediavideo" href="'+lovurl+oh2+'/'+oli+'.mp4"></a><span style="color:#999;">����Ƶ����У����ѧ���ڲ��������ʡ�</span><script type="text/javascript">$(".mediavideo").media({ width: $("#videoU").width(),height:($("#videoU").width()/4*3),autoplay: true,overflow: scroll});</script>');
	showForm("#videoU","Null");
};

var qiehuana=function(numa){
	for(var ida=0;ida<=4;ida++){
		if(ida==numa){
			$("#qha_con"+ida).css("display","block");
			$("#mynava"+ida).attr('class','nava_on');
		}
		else{
			$("#qha_con"+ida).css("display","none");
			$("#mynava"+ida).attr('class','');
		}
	}
};

var timer=function(s,cs,cj,ca){
	if(s==0){return;}
	var intDiff=tempIntDiff > 0?tempIntDiff:s;
	var	day=0,hour=0,minute=0,second=0;//ʱ��Ĭ��ֵ
	window.setInterval(function(){
		if(intDiff>=0){
			hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			$('#hour_show').html('<s id="h"></s>'+hour+'ʱ');
			$('#minute_show').html('<s></s>'+minute+'��');
			$('#second_show').html('<s></s>'+second+'��');
			intDiff--;
			tempIntDiff = intDiff > 0?intDiff:0;
			if(intDiff==0)submitExam(cs,cj,ca);
		}
	}, 1000);
};