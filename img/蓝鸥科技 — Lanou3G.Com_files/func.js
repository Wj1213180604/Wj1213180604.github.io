var Weburl="Lanou3G.Com";
var htmlcopy="Copyright &copy;2013-2015 ��Ÿ�Ƽ� "+Weburl;
var htmlimg="<img src='img/loading.gif' border='0' />";
var htmlimgo="<img src='img/loadimg.gif' border='0' />";
var htmlimgPar="<img src='../img/loading.gif' border='0' />";
var htmlimgoPar="<img src='../img/loadimg.gif' border='0' />";
var htmlimgAsc="img/s_asc.gif";
var htmlimgDesc="img/s_desc.gif";
var Model="do";
var loading="#loading";
var doUrl=Model+"/";
var imgUrl=doUrl+"img";
var cusUrl='i/cus';
var amsUrl='i/try';
var gopage;
var current_time=new Date();
var current_year=current_time.getYear();
var current_month=current_time.getMonth();
var current_Date=current_time.getDate();
var cuid;
var suid;
var vid;
var Limitarea=0;
var Limitconsult=0;
var Limitcustom=0;
var Limitchannel=0;
var Limittender=0;
var Limitfrom=0;
var Limitclass=0;
var Limitgrade=0;
var Limitdate="all";
var Limitstatus="all";
var Limitcategory="all";
var Limitfocus="all";
var LimitTips=0;
var LimitStudentTips=0;
var LimitStudentdate="all";
var LimitStudentstatus="all";
var LimitStudentFee="all";
var LimitStaffstatus="all";
var LimitStudentDocs="all";
var LimitStudentEmps='all';
var consultpage=1;
var consultorder=1;
var consultorderV='time';
var StafforderV='normal';
var consultkey='';
var fsi=0;
var f_str='';
var consultlistpage=1;
var consultlistorder=1;
var consultlistorderV='time';
var courseListId=0;
var isQueue=0;
var colid;
var InterValID;

var ajaxLogin=function(){
	$("#errmsg").empty();
	var user=$("#user").attr("value");
	var password=$("#password").attr("value");
	var err=0;
	var chknum=$("#chknum").attr("value");
	if(""==user){
		$("#errmsg").html("�������û�����");
		$("#user").focus();
		err++;
	}
	else if(""==password){
		$("#errmsg").html("���������룡");
		$("#password").focus();
		err++;
	}
	if(0==err){
		$.cookie('username', user);
		var requests={"question":"Login","user":user,"password":password,"chknum":chknum};
		$.ajax({
		type:'POST',
			url:doUrl,
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
				if(1010==err){
					gotoWhere($(ans).find("answer").attr("note"),1);
				}
				if(2001==err){
					changeImg();
					$("#errmsg").html($(ans).find("answer").attr("note"));
					loadings("h");
					$("#chknum").focus();
				}
				if(3000==err){
					ajaxGetvLimit();
					$("#errmsg").html($(ans).find("answer").attr("note"));
					loadings("h");
					$("#password").focus();
					$("#password").attr("value","");
				}
			},
			complete:function(){
			}
		});
	}
};

var ChangePwd=function(){
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
			url:doUrl,
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
					GetTab();
				}
			},
			complete:function(){
			}
		});
	}
};

var ChangePwdInit=function(){
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
			url:doUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
			},
			error:function(e){
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=$(ans).find("answer").attr("gopage");
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
					hideForm("#Init","#fade");
					GetTab();
				}
			},
			complete:function(){
			}
		});
	}
};

var changeImg=function(){
	$("#chknum").attr("value","");
	var timestamp = (new Date()).valueOf();
	var imgp=imgUrl+"/?t="+timestamp;
	$("#chkimg").attr("src",imgp);
};

var ajaxGetvLimit=function(){
	var ajax_data={"question":"Visit"};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:ajax_data,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			//success
			var err=$(ans).find("answer").attr("err");
			if(1==err){
				var vlimit=$(ans).find("answer").attr("note");
				var justgo=$(ans).find("answer").attr("justgo");
				var gopage=$(ans).find("answer").attr("goto");
			}
			if(1==justgo){
				gotoWhere(gopage,1);
			}else{
				if(1==vlimit){
					$("#checkcode").html(vhtml);
					$("#checkcode").show();
					changeImg();
					$("#user").keypress(function(e){
						if('13'==e.keyCode){
							$("#password").focus();
						}
					});
					$("#password").keypress(function(e){
						if('13'==e.keyCode){
							$("#chknum").focus();
						}
					});
					$("#chknum").keypress(function(e){
						if('13'==e.keyCode){
							ajaxLogin();
						}
					});
				}else{
					$("#user").keypress(function(e){
						if('13'==e.keyCode){
							$("#password").focus();
						}
					});
					$("#password").keypress(function(e){
						if('13'==e.keyCode){
							ajaxLogin();
						}
					});
				}
			}
		},
		complete:function(){
		}
	});
};

var sInterVal=function(){
	setInterval(function(){
		topMain();
		checkmsg();
	},20000);
};

var topMain=function(){
	var requests={"question":"CheckTop"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			$(loading).empty();
			var tops="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var uname = $(ans).find("answer").attr("name");
				var pos = $(ans).find("answer").attr("pos");
				var msg = $(ans).find("answer").attr("msg");
				var duty = $(ans).find("answer").attr("duty");
				var goswitch = $(ans).find("answer").attr("switch");
				var pmsg=(0==msg)?"��0��":"<a href='javascript:void(0);' onclick='checkmsg();' style='color:#FFF;text-decoration:none;padding:0 4px 0 4px;margin:0 2px 0 2px;background:#FAAC58;border:0;border-radius:3px;'>"+msg+"</a>";
				var locate=(""==$(ans).find("answer").attr("locate"))?"":"��"+$(ans).find("answer").attr("locate")+"��";
				var tops="<a href='books.html' target='_blank' style='background-color:#52FDCF;color:#000;border-radius:5px;margin-right:15px;text-decoration:none;'>����ŸͨѶ¼��</a><a href='ranking.html' target='_blank' style='background-color:#ffd700;color:#000;border-radius:5px;margin-right:15px;text-decoration:none;'>���������۰���</a><a href='rankhis.html' target='_blank' style='background-color:#CCC;color:#000;border-radius:5px;margin-right:15px;text-decoration:none;'>���������۰���</a>��"+uname+"����"+pos+"Ȩ��"+locate+"��"+(1==goswitch ? " <a href='switch.html' style='color:#333;font-size:8pt;text-decoration:none;padding:1px 6px 1px 6px;margin:0 8px 0 4px;background:#00FF00;border:0;border-radius:3px;box-shadow:2px 2px 2px #333;'> �л����� </a>&nbsp;":"")+"<a href='javascript:void(0);' onclick='checkset();' style='color:#EEE;font-size:8pt;text-decoration:none;padding:1px 6px 1px 6px;margin:0 4px 0 4px;background:#333;border:0;border-radius:3px;box-shadow:2px 2px 2px #333;' >��������</a><a href='javascript:void(0);' onclick='logout();' style='color:#EEE;font-size:8pt;text-decoration:none;padding:1px 6px 1px 6px;margin:0 8px 0 4px;background:#333;border:0;border-radius:3px;box-shadow:2px 2px 2px #333;' >�� ��</a> ";//����"+pmsg+"��δ��֪ͨ��
				if(1==$(ans).find("answer").attr("input")){
					$('#task').html('<hr style="border:1px dashed #ccc;width:90%;"><input id="inputnew" type="button" value="�Ǽ�¼��" onclick=GoEdit(); />');
				};
				$('#top').html(tops);
			}
		},
		complete:function(){
			GetJobNum();
		}
	});
};

var GetInitPasswd=function(){
	var htmlinit='<ul style="text-align:center;"><hr><li><span style="color:green;font-weight:bold;">Ϊ�˰�ȫ�������뽫��ʼ�����޸�Ϊ���Լ��ĵ�½���벢�μǣ�</span></li><p id="errmsginit" style="color:red;"></p><li>�µ����룺<input type="password" id="passwordinit" size="15" /></li><li>����ȷ�ϣ�<input type="password" id="confirmpswinit" size="15" /></li><li><hr><input type="button" value="�޸�" onclick="ChangePwdInit();" /></li></ul>';
	$("#Init").html(htmlinit);
	$("#passwordinit").focus();
	$("#passwordinit").keypress(function(e){
		if('13'==e.keyCode){
			$("#confirmpswinit").focus();
		}
	});
	$("#confirmpswinit").keypress(function(e){
		if('13'==e.keyCode){
			ChangePwdInit();
		}
	});
	showForm("#Init","#fade");
};

var showCollegeList=function(){
	if(2==$("#style").val()||200<$("#style").val()&&300>$("#style").val()){
		$("#college").attr("disabled",true);
		$("#college").css("background-color","#EEE");
		$("#selCollege").show();
		$("#college").hide();
		$("#college2").show();
		$("#college2").attr("value","");
	}else{
		$("#selCollege").hide();
		$("#college").css("background-color","");
		$("#college").attr("disabled",false);
		$("#college").attr("value","");
		$("#college2").attr("value","");
		$("#college").show();
		$("#college2").hide();
	}$("#selCollege").css("background-color","");
};

var selectCollegeList=function(){
	if(0!=$("#selCollege").val()){
		var strs=$("#selCollege").find("option:selected").text().split("��");
		$("#college").attr("value",strs[0]);
	}else $("#college").attr("value","");
};

var GetInputSels=function(i){
	var requests={"question":"GetInputSel","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#keyword").css("background-color","");
			$("#selCollege").css("background-color","");
			$("#refer").css("background-color","");
			$("#inptip").html(htmlimgo);
		},
		error:function(e){
			alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				alert("err");
			}
			if(1==err){
				cuid=i;
				$("#inptip").html("");
				var htmlinpsel;
				$(ans).find("answer").children().each(function(idx0,ele0){
					htmlinpsel="";
					$(ans).find($(ele0)[0].tagName).each(function(){
						if("input"!=$(ele0)[0].tagName){
							$(this).find("option").each(function(idx,ele){
								if("1"==$(ele).attr("sel")){
									htmlinpsel+='<option value="'+$(ele).attr("id")+'" selected>'+$(ele).attr("name")+'</option>';
								}else{
									htmlinpsel+='<option value="'+$(ele).attr("id")+'">'+$(ele).attr("name")+'</option>';
								}
								$("#"+$(ele0)[0].tagName).attr("disabled",false);
								if($(ele0)[0].tagName==$(ans).find($(ele0)[0].tagName).attr("val")){
									$("#"+$(ele0)[0].tagName).attr("disabled",true);
								}
							});
						}else{
							$(ans).find($(ele0)[0].tagName).children().each(function(idx1,ele1){
								$("#"+$(ele1)[0].tagName).attr("value",$(this).text());
							});
						}
					});
					$("#"+$(ele0)[0].tagName).html(htmlinpsel);
				});
				var selcollegehtml='';
				selcollegehtml+='<option value="0">��ѡ��</option>';
				if(0<$(ans).find("selcollege").size()){
					$(ans).find("selcollege").each(function(){
						selcollegehtml+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("user")==''?'':'��'+$(this).attr("user")+'��')+'</option>';
					});
				}$("#selCollege").html(selcollegehtml);
				$("#selCollege").css("width","auto");
				$("#college").show();
				$("#college2").hide();
				if(0<$(ans).find("answer").attr("Iscollege")){
					$("#college").attr("disabled",true);
					$("#college").css("background-color","#EEE");
					if($("#college").attr("value")==""){
						$("#selCollege").show();
						$("#college").hide();
					}else $("#selCollege").hide();
				}else{
					$("#selCollege").hide();
					$("#college").css("background-color","");
					$("#college").attr("disabled",false);
				}
			}
		},
		complete:function(){
		}
	});
};

var SubInput=function(z){
	var sublocate=$("#locate").val();
	var subname=$("#name").attr("value");
	var subsex=$("#sex").val();
	var subtel=$("#tel").attr("value");
	var subim=$("#im").attr("value");
	var substyle=$("#style").val();
	var subtender=$("#tender").val();
	var subfoundate=$("#foundate").val();
	var subeducate=$("#educate").val();
	var subcollege=$("#college").attr("value")+($("#college2").attr("value")==''?'':'-'+$("#college2").attr("value"));
	var subprof=$("#prof").attr("value");
	var subarea=$("#inparea").val();
	var subfeeway=$("#inpfeeway").val();
	var subcurrent=$("#current").val();
	var subrefer=$("#refer").attr("value");
	var subkeyword=$("#keyword").attr("value");
	var subcommon=$("#common").attr("value");
	var subcreditID=$("#creditID").attr("value");
	var subemergname=$("#emergname").attr("value");
	var subemergtel=$("#emergtel").attr("value");
	var subgraduate=$("#graduate").val();
	var selcolid=$("#selCollege").val();
	var requests={"question":"UpdateDatas","id":cuid,"locate":sublocate,"name":subname,"sex":subsex,"tel":subtel,"im":subim,"style":substyle,"tender":subtender,"foundate":subfoundate,"educate":subeducate,"college":subcollege,"prof":subprof,"area":subarea,"current":subcurrent,"refer":subrefer,"keyword":subkeyword,"common":subcommon,"creditid":subcreditID,"emergname":subemergname,"emergtel":subemergtel,"feeway":subfeeway,"graduate":subgraduate,"selcolid":selcolid};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
			$("#submitedit").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				alert("err");
			}
			if(2001==err){
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
			}
			if(2002==err){
				$("#refer").css("background-color","#FAAC58");
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
			}
			if(2003==err){
				$("#selCollege").css("background-color","#FAAC58");
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
			}
			if(2004==err){
				$("#keyword").css("background-color","#FAAC58");
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
			}
			if(1010==err){
				hideForm("#newinput","#fade");
				if(0<z){
					Enroll(cuid);
					$("#submitedit").attr("disabled",false);
				}else{
					GetCondition();
					$("#submitedit").attr("disabled",false);
				}
			}
		},
		complete:function(){
		}
	});
};

var SubInputCommit=function(cat){
	var subcat=cat;
	var subval=$("#"+cat).attr("value");
	var requests={"question":"CustomInputCommit","id":cuid,"cat":subcat,"val":subval};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
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
				$("#inptip").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#inptip").html("");
			}
		},
		complete:function(){
		}
	});
};

var SubNameCommit=function(){
	var subname=$("#name").attr("value");
	var requests={"question":"CustomNameCommit","id":cuid,"name":subname};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
			$("#repWarning").hide();
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#inptip").html("");
			}
			if(1==err){
				$("#repWarning").show();
				var repnamehtml="&nbsp;&nbsp;<span style='color:red;'>ϵͳ���������ظ�����������ʵ�Ƿ�Ϊ�ظ������粻��ͬ�������Դ���Ϣ��</span>";
				$(ans).find("repcustome").each(function(){
					repnamehtml+='<li id='+$(this).attr("id")+'>&nbsp;&nbsp;��'+$(this).attr("name")+'��'+($(this).attr("tel")==""?"":' �ֻ��ţ�'+$(this).attr("tel"))+($(this).attr("qq")==""?"":' QQ��'+$(this).attr("qq"))+($(this).attr("credit")==""?"":' ֤���ţ�'+$(this).attr("credit"))+($(this).attr("college")==""?"":' ��ҵԺУ��'+$(this).attr("college"))+' ['+$(this).attr("stat")+']</li>';
				});
				$("#repWarning").html(repnamehtml);
				$("#inptip").html("");
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#newinput");
		}
	});
};

var CloseWA=function(i){
	hideForm("#"+i,"#fade");
};

var CloseW=function(i){
	if(!$("#Details").is(":hidden")&&!$("#Operate").is(":hidden"))hideForm("#"+i,"null");
	else hideForm("#"+i,"#fade");
	clearInterval(InterValID);
};

var CloseW_S=function(i){
	hideForm("#"+i,"#fade2");
};

var CloseWin1=function(i){
	hideForm("#"+i,"null");
};

var CloseWin2=function(i){
	hideForm("#"+i,"null");
	hideForm("#Weekly","#fade");
};

var CloseWin3=function(i){
	hideForm("#"+i,"#fade3");
};

var CloseWStulist=function(i){
	hideForm("#"+i,"#fade2");
	hideForm("#"+i,"#over");
};

var GetJobNum=function(){
	var requests={"question":"GetTaskTodo"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			$(loading).empty();
			var tops="";
			$('#todo').html("");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var jobs;
				if(0<$(ans).find("answer").attr("note")){
					sblink($);
					setInterval("changeColor()",1000);
					if(window.location.pathname.indexOf($(ans).find("answer").attr("gopage"))>=0){
						jobs="<hr style='border:1px dashed #eee;'><span id='colorfont'>�С�<a href='javascript:void(0);' onclick='checkTodo();' style='color:#ff9900;' >"+$(ans).find("answer").attr("note")+"</a>������������</span>";
					}else{
						jobs="<hr style='border:1px dashed #eee;'><span id='colorfont'>�С�<a href='"+$(ans).find("answer").attr("gopage")+"?do' style='color:#ff9900;' >"+$(ans).find("answer").attr("note")+"</a>������������</span>";
					}
				}
				$('#todo').html(jobs);
			}
		},
		complete:function(){
		}
	});
};

var checkTodo=function(){
	var requests={"question":"GetTaskList"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			$(loading).empty();
			var tops="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				if(0<$(ans).find("answer").attr("note")){
					Limitarea=0;
					Limitconsult=$(ans).find("answer").attr("gopage");
					Limitcustom=0;
					Limittender=0;
					Limitfrom=0;
					Limitdate="all";
					Limitfocus="all";
					Limitcategory="all";
					LimitTips=0;
					consultorderV="time";
					consultorder=1;
					consultpage=1;
					consultkey="";
					$("#search").val("");
					Limitstatus=$(ans).find("answer").attr("note");
					$("#imgtime").attr("src",htmlimgAsc);
					changeConcultOrder(consultorderV);
				}
			}
		},
		complete:function(){
		}
	});
};

var GetConsultSwitch=function(){
	var requests={"question":"GetConsultSwitch"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			$('#consultswitch').html("");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				if(0<$(ans).find("answer").attr("note"))$('#consultswitch').html("����״̬<a href='javascript:void(0);' onclick='SwitchReceiver();' "+(0<$(ans).find("answer").attr("gopage")?"style='background-color:#adff2f;color:#000;padding-left:3px;padding-right:3px;border:1px #000 solid;border-radius:3px;margin-right:20px;text-decoration:none;'>����":"style='background-color:#ccc;color:#000;padding-left:3px;padding-right:3px;border:1px #000 solid;border-radius:3px;margin-right:20px;text-decoration:none;'>�ر�")+"</a>");
			}
		},
		complete:function(){
		}
	});
};

var SwitchReceiver=function(){
	var requests={"question":"SwitchReceiver"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err)alert($(ans).find("answer").attr("note"));
			if(1010==err)GetConsultSwitch();
		},
		complete:function(){
		}
	});
};

var GetSwitch=function(){
	var requests={"question":"GetSwitchList"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				gotoWhere('./',1);
			}
			if(1==err){
				var htmltab="<p style='font-size:18px;line-height:60px;'>"+$(ans).find("answer").attr("uname")+"�����ж��������˺ţ���ѡ������Ҫ��½���˺ţ�</p>";
				var showLname;
				$(ans).find("switch").each(function(){
					showLname=$(this).attr("loc")==""?"":'��'+$(this).attr("loc")+'��';
					htmltab+=' <input style="font-size:18px;padding:8px;margin:10px;" type=button value=" '+$(this).attr("name")+showLname+' " onclick="checkSwitch('+$(this).attr("uid")+');" /> ';
				});htmltab+='<br/><br/>';
				$("#content").html(htmltab);
			}
		},
		complete:function(){
		}
	});
};

var checkSwitch=function(i){
	var requests={"question":"checkSwitch","uid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			}
			if(1010==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
		},
		complete:function(){
		}
	});
};

var GetTab=function(){
	var requests={"question":"GetTabList"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#nav").html("");
			}
			if(1==err){
				var htmltab="";
				htmltab+='<div id="consultswitch" style="float:left;margin-left:10px;margin-right:-10px;"/><ul id="tabnav">';
				$(ans).find("tab").each(function(){
					if(window.location.pathname.indexOf($(this).attr("page"))>=0){
						htmltab+='<li><a class="active" href="javascript:void(0);">'+$(this).attr("title")+'</a></li>';
					}else{
						htmltab+='<li><a href="'+$(this).attr("page")+'">'+$(this).attr("title")+'</a></li>';
					}
				});
				htmltab+='</ul>';
				$("#nav").html(htmltab);
				if(0<$(ans).find("answer").attr("dopass"))GetInitPasswd();
			}
		},
		complete:function(){
			GetConsultSwitch();
		}
	});
};

var GetCondition=function(){
	var requests={"question":"GetConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				var htmlIsStaticsshow="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">��ѯ����/ԺУ��չ��</span><select id="consult" onchange=setLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("custom").size()){
					html+='<label id="selcustom"><span style="font-weight:bold;">���߿ͷ���</span><select id="custom" onchange=setLimitCustom();>';
					if(0==Limitcustom){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("custom").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("custom").each(function(){
							if($(this).attr("id")==Limitcustom){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("consult").size()||0<$(ans).find("custom").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("zfrom").size()){
					html+='<span style="font-weight:bold;">��Դ��</span><select id="zfrom" onchange=setLimitFrom();>';
					if(0==Limitfrom){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("zfrom").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("zfrom").each(function(){
							if($(this).attr("id")==Limitfrom){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("ztender").size()){
					html+='<span style="font-weight:bold;">������</span><select id="ztender" onchange=setLimitTender();>';
					if(0==Limittender){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("ztender").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("ztender").each(function(){
							if($(this).attr("id")==Limittender){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("isCustomerself").attr("self"))html+='<a id="myself" class="'+($(ans).find("isCustomerself").attr("self")==Limitcustom?'active':'')+'" href = "javascript:void(0);" onclick="checkCustomerMyself('+$(ans).find("isCustomerself").attr("self")+');"> >>> �ҵ�¼�� </a>';
				if(0<$(ans).find("isself").attr("self"))html+='<a id="myself" class="'+($(ans).find("isself").attr("self")==Limitconsult?'active':'')+'" href = "javascript:void(0);" onclick="checkMyself('+$(ans).find("isself").attr("self")+');"> >>> �ҵĿͻ� </a>';
				html+=htmlhr;
				$("#zselects").html(html);
				html="";
				if(0<$(ans).find("status").size()){
					if('all'==Limitstatus){
						html+='<span style="font-weight:bold;">״̬��</span><a class="active" href="javascript:void(0);" onclick=setLimitStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">״̬��</span><a href="javascript:void(0);" onclick=setLimitStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							if($(this).attr("id")==Limitstatus){
								html+='<a class="active" id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
					html+=htmlhr;
				}
				$("#status").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
							if("all"!=Limitdate&&0<$(ans).find("isStatics").size())htmlIsStaticsshow='<span style="margin:0 25px 0 15px;color:#AAA;">|</span><input id="inpStatics" style="margin-left:2px;" type="button" onclick="ShowDateStatics(1);" value="'+(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$(this).attr("name").replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'����ѯҵ������ " />';
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
				html="";
				if(0<$(ans).find("category").size()){
					html+=htmlhr;
					if('all'==Limitcategory){
						html+='<span style="font-weight:bold;">���ͣ�</span><a class="active" href="javascript:void(0);" onclick=setLimitCategory(\'all\');>ȫ��</a>';
						$(ans).find("category").each(function(){
							html+='<a id="category'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitCategory(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">���ͣ�</span><a href="javascript:void(0);" onclick=setLimitCategory(\'all\');>ȫ��</a>';
						$(ans).find("category").each(function(){
							if($(this).attr("id")==Limitcategory){
								html+='<a class="active" id="category'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitCategory(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="category'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitCategory(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
				}
				html+=htmlIsStaticsshow;
				$("#category").html(html);
				html="";
				html+=htmlhr;
				if(0<$(ans).find("focus").size()){
					if('all'==Limitfocus){
						html+='<span style="font-weight:bold;">״̬��</span><a class="active" href="javascript:void(0);" onclick=setLimitFocus(\'all\');>ȫ��</a>';
						$(ans).find("focus").each(function(){
							html+='<a id="focus'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitFocus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">״̬��</span><a href="javascript:void(0);" onclick=setLimitFocus(\'all\');>ȫ��</a>';
						$(ans).find("focus").each(function(){
							if($(this).attr("id")==Limitfocus){
								html+='<a class="active" id="focus'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitFocus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="focus'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitFocus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
				}
				html+='<span style="margin:0 25px 0 15px;color:#AAA;">|</span><a style="background:none;" href="javascript:void(0);" onclick="thisReload();"><img src="img/reload.gif" style="margin:0 0 -3px 0px;" class="tooltip" title="ˢ�µ�ǰ����"/></a>';
				$("#focus").html(html);
				html="";
				if(0==$(ans).find("tips").size()&&1==LimitTips){
					LimitTips=0;
				}
				else if(0<$(ans).find("tips").size()){
					html+=htmlhr;
					$(ans).find("tips").each(function(){
						if(1==LimitTips){
							html+='<span style="font-weight:bold;">��ʾ��</span><a class="active" href="javascript:void(0);" onclick="setLimitTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}else{
							html+='<span style="font-weight:bold;">��ʾ��</span><a href="javascript:void(0);" style="color:#0080FF;" onclick="setLimitTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}
					});	
				}
				$("#tips").html(html);
			}
		},
		complete:function(){
			getLocalstaff();
		}
	});
};

var ShowDateStatics=function(t){
	showForm("#perf","#fade");
	var requests={"question":"GetDateStatics","area":Limitarea,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val(),"t":t};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#perf").html("����ͳ��... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseW(\'perf\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmldata='';
				var locatenum=staffnum=0;
				htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+$('#inpStatics').attr("value")+'</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseW(\'perf\');">�ر�</a>]</div>';
				htmldata+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
				htmldata+='<tr style="height:26px;"><td rowspan="2" style="width:5%;background-color:#FFFFCC;">����</td><td rowspan="2" style="width:8%;background-color:#FFFFCC;">��ѯ����</td><td style="background-color:#33FF99" colspan="5">�Ǽ�ȷ��</td><td style="background-color:#33FFFF" colspan="5">����(�Ǽ�ʱ����)</td><td style="background-color:#CCFF99" colspan="5">ת����(�Ǽ�ʱ����)</td><td colspan="6" style="background-color:#FFF;">����(ʱ���ڷ�����)</td><td colspan="2" style="width:10%;background-color:#F6E3CE;">�˵�</td><td rowspan="2" style="width:7%;background-color:#00b6cf;">���㱨��</td></tr>';
				htmldata+='<tr><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">�ڱ�</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">�ڱ�</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">�ڱ�</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">�ϼ�ת��</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">�ڱ�</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">��ȷ��</td><td style="background-color:#F6E3CE;">ʱ���ڱ�</td><td style="background-color:#F6E3CE;">ʱ���ⱨ</td></tr>';
				locatenum=$(ans).find("Locate").size();
				var ts1=ts2=ts3=ts4=ts5=ts6=ts7=ts8=ts9=ts10=ts16=ts17=ts18=ts19=ts20=ts21=ts22=ts23=ts24=ats11=ats12=ats13=ats14=ats15=ts20avg=ts23avg=ts24avg=countstaff=0;
				$(ans).find("Locate").each(function(){
					staffnum=$(this).find("staff").size();
					if(0<staffnum){
						htmldata+='<tr id="staff'+$(this).attr("id")+'"><td rowspan="'+staffnum+'" style="background-color:#FFFFCC;">'+$(this).attr("name")+'</td>';
						$(this).find("staff").each(function(){
							countstaff++;
							htmldata+='<td style="background-color:#FFF;">'+$(this).attr("name")+'</td><td>'+$(this).find("s1").text()+'</td><td>'+$(this).find("s2").text()+'</td><td>'+$(this).find("s3").text()+'</td><td>'+$(this).find("s4").text()+'</td><td style="background-color:#FFE;">'+$(this).find("s5").text()+'</td><td>'+$(this).find("s6").text()+'</td><td>'+$(this).find("s7").text()+'</td><td>'+$(this).find("s8").text()+'</td><td>'+$(this).find("s9").text()+'</td><td style="background-color:#FFE;">'+$(this).find("s10").text()+'</td><td class="staffs11">'+($(this).find("s11").text()==0?'0%':$(this).find("s11").text()+'%')+'</td><td class="staffs12">'+($(this).find("s12").text()==0?'0%':$(this).find("s12").text()+'%')+'</td><td class="staffs13">'+($(this).find("s13").text()==0?'0%':$(this).find("s13").text()+'%')+'</td><td class="staffs14">'+($(this).find("s14").text()==0?'0%':$(this).find("s14").text()+'%')+'</td><td class="staffs15" style="background-color:#FFE;">'+($(this).find("s15").text()==0?'0%':$(this).find("s15").text()+'%')+'</td><td style="background-color:#FFF;">'+$(this).find("s16").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s17").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s18").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s19").text()+'</td><td class="staffs20" style="background-color:#FFE;">'+$(this).find("s20").text()+'</td><td class="staffs23" style="background-color:#FFE;">'+$(this).find("s23").text()+'</td><td style="background-color:#F6E3CE;">'+$(this).find("s21").text()+'</td><td style="background-color:#F6E3CE;">'+$(this).find("s22").text()+'</td><td class="staffs24" style="background-color:#FFFF99;">'+$(this).find("s24").text()+'</td></tr>';
							ts1=parseFloat(ts1)+parseFloat($(this).find("s1").text());
							ts2=parseFloat(ts2)+parseFloat($(this).find("s2").text());
							ts3=parseFloat(ts3)+parseFloat($(this).find("s3").text());
							ts4=parseFloat(ts4)+parseFloat($(this).find("s4").text());
							ts5=parseFloat(ts5)+parseFloat($(this).find("s5").text());
							ts6=parseFloat(ts6)+parseFloat($(this).find("s6").text());
							ts7=parseFloat(ts7)+parseFloat($(this).find("s7").text());
							ts8=parseFloat(ts8)+parseFloat($(this).find("s8").text());
							ts9=parseFloat(ts9)+parseFloat($(this).find("s9").text());
							ts10=parseFloat(ts10)+parseFloat($(this).find("s10").text());
							ts16=parseFloat(ts16)+parseFloat($(this).find("s16").text());
							ts17=parseFloat(ts17)+parseFloat($(this).find("s17").text());
							ts18=parseFloat(ts18)+parseFloat($(this).find("s18").text());
							ts19=parseFloat(ts19)+parseFloat($(this).find("s19").text());
							ts20=parseFloat(ts20)+parseFloat($(this).find("s20").text());
							ts21=parseFloat(ts21)+parseFloat($(this).find("s21").text());
							ts22=parseFloat(ts22)+parseFloat($(this).find("s22").text());
							ts23=parseFloat(ts23)+parseFloat($(this).find("s23").text());
							ts24=parseFloat(ts24)+parseFloat($(this).find("s24").text());
							ts20avg=parseFloat(ts20)/countstaff;
							ts23avg=parseFloat(ts23)/countstaff;
							ts24avg=parseFloat(ts24)/countstaff;
						});
					}
				});
				ats11=(parseFloat(ts6)/parseFloat(ts1)*100).toFixed(1);
				ats12=(parseFloat(ts7)/parseFloat(ts2)*100).toFixed(1);
				ats13=(parseFloat(ts8)/parseFloat(ts3)*100).toFixed(1);
				ats14=(parseFloat(ts9)/parseFloat(ts4)*100).toFixed(1);
				ats15=(parseFloat(ts10)/parseFloat(ts5)*100).toFixed(1);
				if(1<locatenum||1<staffnum){
					htmldata+='<tr style="background-color:#FFFFCC"><td colspan="2" style="height:26px;font-weight:bold;">�ϼƣ�</td><td>'+ts1+'</td><td>'+ts2+'</td><td>'+ts3+'</td><td>'+ts4+'</td><td>'+ts5+'</td><td>'+ts6+'</td><td>'+ts7+'</td><td>'+ts8+'</td><td>'+ts9+'</td><td>'+ts10+'</td><td>'+(ats11==0?'0%':ats11+'%')+'</td><td>'+(ats12==0?'0%':ats12+'%')+'</td><td>'+(ats13==0?'0%':ats13+'%')+'</td><td>'+(ats14==0?'0%':ats14+'%')+'</td><td>'+(ats15==0?'0%':ats15+'%')+'</td><td>'+ts16+'</td><td>'+ts17+'</td><td>'+ts18+'</td><td>'+ts19+'</td><td>'+ts20+'</td><td>'+ts23+'</td><td>'+ts21+'</td><td>'+ts22+'</td><td>'+ts24+'</td></tr></table>';
				}else htmldata+='</table>';
				var htmldataO='';
				if(0<$(ans).find("LocateO").size()){
					var locatenum=staffnum=0;
					htmldataO+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
					htmldataO+='<br/><tr style="height:26px;"><td rowspan="2" style="width:5%;background-color:#FFFFCC;">��������</td><td rowspan="2" style="width:8%;background-color:#FFFFCC;">��ѯ����</td><td style="background-color:#33FF99" colspan="5">�Ǽ�ȷ��</td><td style="background-color:#33FFFF" colspan="5">����(�Ǽ�ʱ����)</td><td style="background-color:#CCFF99" colspan="5">ת����(�Ǽ�ʱ����)</td><td colspan="6" style="background-color:#FFF;">����(ʱ���ڷ�����)</td><td colspan="2" style="width:10%;background-color:#F6E3CE;">�˵�</td><td rowspan="2" style="width:7%;background-color:#00b6cf;">���㱨��</td></tr>';
					htmldataO+='<tr><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">�ڱ�</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FF99">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">�ڱ�</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#33FFFF">����</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">�ڱ�</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">����</td><td style="background-color:#CCFF99">�ϼ�ת��</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">�ڱ�</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">����</td><td style="background-color:#FFF;">��ȷ��</td><td style="background-color:#F6E3CE;">ʱ���ڱ�</td><td style="background-color:#F6E3CE;">ʱ���ⱨ</td></tr>';
					locatenum=$(ans).find("LocateO").size();
					var ts1=ts2=ts3=ts4=ts5=ts6=ts7=ts8=ts9=ts10=ts16=ts17=ts18=ts19=ts20=ts21=ts22=ts23=ts24=ats11=ats12=ats13=ats14=ats15=ts20avg=ts23avg=ts24avg=countstaff=0;
					$(ans).find("LocateO").each(function(){
						staffnum=$(this).find("staff").size();
						if(0<staffnum){
							htmldataO+='<tr id="staff'+$(this).attr("id")+'"><td rowspan="'+staffnum+'" style="background-color:#FFFFCC;">'+$(this).attr("name")+'</td>';
							$(this).find("staff").each(function(){
								countstaff++;
								htmldataO+='<td style="background-color:#FFF;">'+$(this).attr("name")+'</td><td>'+$(this).find("s1").text()+'</td><td>'+$(this).find("s2").text()+'</td><td>'+$(this).find("s3").text()+'</td><td>'+$(this).find("s4").text()+'</td><td style="background-color:#FFE;">'+$(this).find("s5").text()+'</td><td>'+$(this).find("s6").text()+'</td><td>'+$(this).find("s7").text()+'</td><td>'+$(this).find("s8").text()+'</td><td>'+$(this).find("s9").text()+'</td><td style="background-color:#FFE;">'+$(this).find("s10").text()+'</td><td class="staffs11">'+($(this).find("s11").text()==0?'0%':$(this).find("s11").text()+'%')+'</td><td class="staffs12">'+($(this).find("s12").text()==0?'0%':$(this).find("s12").text()+'%')+'</td><td class="staffs13">'+($(this).find("s13").text()==0?'0%':$(this).find("s13").text()+'%')+'</td><td class="staffs14">'+($(this).find("s14").text()==0?'0%':$(this).find("s14").text()+'%')+'</td><td class="staffs15" style="background-color:#FFE;">'+($(this).find("s15").text()==0?'0%':$(this).find("s15").text()+'%')+'</td><td style="background-color:#FFF;">'+$(this).find("s16").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s17").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s18").text()+'</td><td style="background-color:#FFF;">'+$(this).find("s19").text()+'</td><td class="staffs20" style="background-color:#FFE;">'+$(this).find("s20").text()+'</td><td class="staffs23" style="background-color:#FFE;">'+$(this).find("s23").text()+'</td><td style="background-color:#F6E3CE;">'+$(this).find("s21").text()+'</td><td style="background-color:#F6E3CE;">'+$(this).find("s22").text()+'</td><td class="staffs24" style="background-color:#FFFF99;">'+$(this).find("s24").text()+'</td></tr>';
								ts1=parseFloat(ts1)+parseFloat($(this).find("s1").text());
								ts2=parseFloat(ts2)+parseFloat($(this).find("s2").text());
								ts3=parseFloat(ts3)+parseFloat($(this).find("s3").text());
								ts4=parseFloat(ts4)+parseFloat($(this).find("s4").text());
								ts5=parseFloat(ts5)+parseFloat($(this).find("s5").text());
								ts6=parseFloat(ts6)+parseFloat($(this).find("s6").text());
								ts7=parseFloat(ts7)+parseFloat($(this).find("s7").text());
								ts8=parseFloat(ts8)+parseFloat($(this).find("s8").text());
								ts9=parseFloat(ts9)+parseFloat($(this).find("s9").text());
								ts10=parseFloat(ts10)+parseFloat($(this).find("s10").text());
								ts16=parseFloat(ts16)+parseFloat($(this).find("s16").text());
								ts17=parseFloat(ts17)+parseFloat($(this).find("s17").text());
								ts18=parseFloat(ts18)+parseFloat($(this).find("s18").text());
								ts19=parseFloat(ts19)+parseFloat($(this).find("s19").text());
								ts20=parseFloat(ts20)+parseFloat($(this).find("s20").text());
								ts21=parseFloat(ts21)+parseFloat($(this).find("s21").text());
								ts22=parseFloat(ts22)+parseFloat($(this).find("s22").text());
								ts23=parseFloat(ts23)+parseFloat($(this).find("s23").text());
								ts24=parseFloat(ts24)+parseFloat($(this).find("s24").text());
								ts20avg=parseFloat(ts20)/countstaff;
								ts23avg=parseFloat(ts23)/countstaff;
								ts24avg=parseFloat(ts24)/countstaff;
							});
						}
					});
					ats11=(parseFloat(ts6)/parseFloat(ts1)*100).toFixed(1);
					ats12=(parseFloat(ts7)/parseFloat(ts2)*100).toFixed(1);
					ats13=(parseFloat(ts8)/parseFloat(ts3)*100).toFixed(1);
					ats14=(parseFloat(ts9)/parseFloat(ts4)*100).toFixed(1);
					ats15=(parseFloat(ts10)/parseFloat(ts5)*100).toFixed(1);
					if(1<locatenum||1<staffnum){
						htmldataO+='<tr style="background-color:#FFFFCC"><td colspan="2" style="height:26px;font-weight:bold;">�ϼƣ�</td><td>'+ts1+'</td><td>'+ts2+'</td><td>'+ts3+'</td><td>'+ts4+'</td><td>'+ts5+'</td><td>'+ts6+'</td><td>'+ts7+'</td><td>'+ts8+'</td><td>'+ts9+'</td><td>'+ts10+'</td><td>'+(ats11==0?'0%':ats11+'%')+'</td><td>'+(ats12==0?'0%':ats12+'%')+'</td><td>'+(ats13==0?'0%':ats13+'%')+'</td><td>'+(ats14==0?'0%':ats14+'%')+'</td><td>'+(ats15==0?'0%':ats15+'%')+'</td><td>'+ts16+'</td><td>'+ts17+'</td><td>'+ts18+'</td><td>'+ts19+'</td><td>'+ts20+'</td><td>'+ts23+'</td><td>'+ts21+'</td><td>'+ts22+'</td><td>'+ts24+'</td></tr></table>';
					}else htmldataO+='</table>';
				}
				htmldata+=htmldataO+'<div style="color:#999;float:right;">* ע���ñ�������Ϊ��ְ������ͳ���б��е���ѯ���ʻ�ԺУ��չ��Ա����ת�ڻ���ְ�Լ�δ�����ñ���ͳ�Ƶ���Ա���ݲ��ڴ˱���������.</div>';
				$("#perf").html(htmldata+'<br/>');
				$(".allc").formatCurrency();
				JudgeWindowSizetoCss("#perf");
				DealStaticsColor();
			}
		},
		complete:function(){
		}
	});
};

var DealStaticsColor=function(){
	$(".staffs11").each(function(){
		if(parseFloat($(this).text().substr(0,$(this).text().length-1)) < parseFloat(ats11))$(this).css("background-color","#F5BCA9");
	});
	$(".staffs12").each(function(){
		if(parseFloat($(this).text().substr(0,$(this).text().length-1)) < parseFloat(ats12))$(this).css("background-color","#F5BCA9");
	});
	$(".staffs13").each(function(){
		if(parseFloat($(this).text().substr(0,$(this).text().length-1)) < parseFloat(ats13))$(this).css("background-color","#F5BCA9");
	});
	$(".staffs14").each(function(){
		if(parseFloat($(this).text().substr(0,$(this).text().length-1)) < parseFloat(ats14))$(this).css("background-color","#F5BCA9");
	});
	$(".staffs15").each(function(){
		if(parseFloat($(this).text().substr(0,$(this).text().length-1)) < parseFloat(ats15))$(this).css("background-color","#F5BCA9");
	});
	$(".staffs20").each(function(){
		if(parseFloat($(this).text()) < parseFloat(ts20avg))$(this).css("background-color","#F5BC00");
	});
	$(".staffs23").each(function(){
		if(parseFloat($(this).text()) < parseFloat(ts23avg))$(this).css("background-color","#F5BC00");
	});
	$(".staffs24").each(function(){
		if(parseFloat($(this).text()) < parseFloat(ts24avg))$(this).css("background-color","#F5BC00");
	});
};

var thisReload=function(){
	topMain();
	GetTab();
	GetCondition();
	checkmsg();
};

var chkDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	$("#inpStatics").attr('value',(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$('#date0').val()+'��'+$('#date1').val()+'����ѯҵ������ ');
	getData();
};

var Searcher=function(){
	Limitarea=0;
	Limitconsult=0;
	Limitcustom=0;
	Limittender=0;
	Limitfrom=0;
	Limitdate="all";
	Limitstatus="all";
	Limitcategory="all";
	Limitfocus="all";
	LimitTips=0;
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeConcultOrder(consultorderV);
};

var GetChannelSels=function(c){
	var requests={"question":"GetChannelSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlchannelsel ="";
				$(ans).find("option").each(function(){
					if($(ans).find("option").size()==1){
						htmlchannelsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" checked> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}else{
						if(1!=$(this).attr("sel"))htmlchannelsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}
				});
				$("#Operatesel").html(htmlchannelsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var GetConsultSels=function(c){
	var requests={"question":"GetConsultSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var isall=$(ans).find("answer").attr("isall");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					if($(ans).find("option").size()==1){
						htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" checked> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}else{
						if(1!=$(this).attr("sel"))htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}
				});
				htmlconsultsel+='<div id="allarea" style="display:'+(isall==1?'display':'none')+';"><hr style="border:1px dashed #ccc;"><div id="otherarea">>>> <input type="button" value=" �������� " onclick="ShowOtherArea();" /></div></div>';
				$("#Operatesel").html(htmlconsultsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var GetAddConsultSels=function(i,c){
	var requests={"question":"GetAddConsultSel","cuid":i,"cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var isall=$(ans).find("answer").attr("isall");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					htmlconsultsel+='<li><label><input type="checkbox" value="'+$(this).attr("id")+'" name="Operateselm" '+(1==$(this).attr("sel")?"checked":"")+'> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
				});
				$("#Operatesel").html(htmlconsultsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var GetAddChannelSels=function(i){
	var requests={"question":"GetAddChannelSel","cuid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var isall=$(ans).find("answer").attr("isall");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" '+(1==$(this).attr("sel")?"checked":"")+'> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
				});htmlconsultsel+='<hr style="border:1px dashed #ccc;"><li><label><input type="radio" value="0" name="Operatesel" /> ȡ������ </label></li>';
				$("#Operatesel").html(htmlconsultsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var GetLocateConsultSel=function(c){
	var requests={"question":"GetLocateConsultSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					if($(ans).find("option").size()==1){
						htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" checked> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}else{
						if(1!=$(this).attr("sel"))htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
					}
				});
				$("#Operatesel").html(htmlconsultsel);
			}
		},
		complete:function(){
		}
	});
};

var Avalid=function(i){
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������Ч��ԭ����<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Avalid\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var GoEdit=function(i){
	$("#repWarning").hide();
	$("#appendinput").html("");
	showForm("#newinput","#fade");
	$("#name").attr("value","");
	$("#tel").attr("value","");
	$("#im").attr("value","");
	$("#college").attr("value","");
	$("#prof").attr("value","");
	$("#keyword").attr("value","");
	$("#refer").attr("value","");
	$("#common").attr("value","");
	$("#creditID").attr("value","");
	$("#emergname").attr("value","");
	$("#emergtel").attr("value","");
	$("#submitedit").attr("value","�Ǽ�");
	cuid=0;
	if(0<i){
		$("#submitedit").attr("value","�޸�");
		cuid=i;
	}
	GetInputSels(cuid);
};

var Delete=function(i){
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li>ɾ��<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>��ԭ����<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Delete\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Invalid=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������Ч��ԭ����<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Invalid\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var ToCancel=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>����������ԭ����<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'ToCancel\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var toOperate=function(t){
	var c=$("#OperateComment").attr("value");
	var d=$('input[name=Operatesel]:checked').val();
	var r=$("#FeeCut").attr("value");
	var f=$("#FeeTopay").attr("value");
	var s=$("#payway").val();
	var p=$("#customercid").attr("value");
	var b=$("#OperateCheck").attr("checked")?1:0;
	var e=$("#Dodate").attr("value");
	var z=$("#OperateTracksCheck").attr("checked")?1:0;
	var w=$("#Paydate").attr("value");
	var m_str='';
	$("input[name=Operateselm]:checked").each(function(){
		m_str+="["+$(this).attr("value")+"]|";
	});var m=m_str.substr(0,m_str.length-1);
	var requests={"question":"CustomOperation","type":t,"cuid":cuid,"comment":c,"did":d,"r":r,"f":f,"s":s,"p":p,"b":b,"e":e,"z":z,"w":w,"m":m};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submitoperate").attr("disabled",true);
			clearInterval(InterValID);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				$("#Operateloading").html("����ѡ��һ��ѡ���¼������������");
				$("#submitoperate").attr("disabled",false);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(2002==err){
				alert($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
				hideForm("#Operate","#fade");
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(2004==err){
				$("#Operateloading").html("");
				hideForm("#Operate","null");
				alert($(ans).find("answer").attr("note"));
				GoEdit(cuid);
				$("#appendinput").html('<input name="input" type="button" onclick="SubInput(1);" value="���沢����" />&nbsp;&nbsp;');
			}
			if(2005==err){
				alert($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				if(!$("#Details").is(":hidden"))hideForm("#Details","#fade");
				topMain();
				GetCondition();
				if(""!=$(ans).find("answer").attr("note"))alert("�����ɹ�����ѧԱѧ��Ϊ��"+$(ans).find("answer").attr("note"));
			}
		},
		complete:function(){
		}
	});
};

var Assarea=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������ѯ������<hr>';
	htmlOperate+='<div id="Operatesel" style="line-height:20px;font-size:13px;"></div>';
	htmlOperate+='<hr></li><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Assarea\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetDistributeAreaSels();
	showForm("#Operate","#fade");
};

var GetDistributeAreaSels=function(){
	var requests={"question":"GetDistributeAreaSel"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var isall=$(ans).find("answer").attr("isall");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("name")+' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span></label></li>';
				});$("#Operatesel").html(htmlconsultsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var Assign=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>ѡ����ѯ���ʣ�<hr>';
	htmlOperate+='<div id="Operatesel" style="line-height:20px;font-size:13px;"></div>';
	htmlOperate+='<hr></li><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Assign\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetConsultSels(c);
	showForm("#Operate","#fade");
};

var ShowOtherArea=function(){
	var requests={"question":"GetConsultSelOther"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("name")+' '+$(this).attr("locate")+' '+(($(this).attr("online").indexOf("��")>=0)?' <span style="color:red;font-size:10px;">'+$(this).attr("online")+'</span>':' <span style="color:green;font-size:10px;">'+$(this).attr("online")+'</span>')+'</label></li>';
				});
				$("#otherarea").html(htmlconsultsel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var Cssign=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>ָ��ԺУ��չרԱ��<hr><div id="Operatesel" style="line-height:22px;font-size:13px;"></div><hr></li>';
	htmlOperate+='<li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Cssign\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetChannelSels(c);
	showForm("#Operate","#fade");
};

var Ressign=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>ѡ����ѯ���ʣ�<hr><div id="Operatesel" style="line-height:20px;font-size:13px;"></div><hr></li>';
	htmlOperate+='<li style="text-align:left;">ת��ԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Ressign\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetConsultSels(c);
	showForm("#Operate","#fade");
};

var AddConsult=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������ѯ���ʣ�<br/><span style="color:#DF7401;">����ʾ��������ѯ���ʽ���Ӱ�쵽������ѯ���ʵ�ҵ��ͳ�ƣ���</span><hr><div id="Operatesel" style="line-height:20px;font-size:13px;"></div><hr></li>';
	htmlOperate+='<li style="text-align:left;">����ԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'AddConsult\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetAddConsultSels(i,c);
	showForm("#Operate","#fade");
};

var AddChannel=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>���ɺ���ԺУ��չרԱ��<br/><span style="color:#DF7401;">����ʾ������ԺУ��չרԱ����Ӱ�쵽������ѯ���ʺ�ԺУ��չרԱ��ҵ��ͳ�ƣ���</span><hr><div id="Operatesel" style="line-height:20px;font-size:13px;"></div><hr></li>';
	htmlOperate+='<li style="text-align:left;">����ԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'AddChannel\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetAddChannelSels(i);
	showForm("#Operate","#fade");
};

var Totrans=function(i,c){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>ѡ������ѯ���ʣ�<hr><div id="Operatesel" style="line-height:22px;font-size:13px;"></div><hr></li>';
	htmlOperate+='<li style="text-align:left;"><span style="color:#B18904;">��ע�⣺�ƽ���ѯ���ʣ���ͬʱӰ�쵽������ѯ���ʵ�ͳ����Ϣ����</span><br/>�ƽ�ԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Totrans\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetConsultSels(c);
	showForm("#Operate","#fade");
};

var Toonline=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li>�˻�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>��ԭ����<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Toonline\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Detail=function(i){
	cuid=i;
	GetDetail("Detail");
	showForm("#Details","#fade");
	hideForm("#Operate");
};

var GetDetail=function(t){
	var requests={"question":"GetDetails","type":t,"cid":cuid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Details").html(htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">�ͻ���ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span>��';
				var cname=$(ans).find("name").text()==""?"":'<span style="font-weight:bold;">������</span><span style="font-weight:bold;color:blue;">'+$(ans).find("name").text()+'</span>��';
				var csex=$(ans).find("sex").text()==""?"":'<span style="font-weight:bold;">�Ա���</span>'+$(ans).find("sex").text()+'��';
				var ctel=$(ans).find("tel").text()==""?"":'<span style="font-weight:bold;">�绰��</span>'+$(ans).find("tel").text()+'��';
				var cim=$(ans).find("im").text()==""?"":'<span style="font-weight:bold;">QQ��</span>'+$(ans).find("im").text()+'��';
				var ccreditid=$(ans).find("creditid").text()==""?"":'<br /><span style="font-weight:bold;">֤�����룺</span>'+$(ans).find("creditid").text()+'��';
				var cemergname=$(ans).find("emergname").text()==""?"":'<span style="font-weight:bold;">������ϵ�ˣ�</span>'+$(ans).find("emergname").text()+'��';
				var cemergtel=$(ans).find("emergtel").text()==""?"":'<span style="font-weight:bold;">������ϵ�绰��</span>'+$(ans).find("emergtel").text()+'��';
				var cstyle=$(ans).find("style").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">��ѯ��ʽ/��Դ��</span><span style="color:#DF7401;">'+$(ans).find("style").text()+'</span>��<br />';
				var ctender=$(ans).find("tender").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ѧ������</span>'+$(ans).find("tender").text()+'��';
				var cfoundate=$(ans).find("foundate").text()=="��ѡ��"?"":'<span style="font-weight:bold;">������</span>'+$(ans).find("foundate").text()+'��';
				var cfeeway=$(ans).find("feeway").text()=="��ѡ��"?"":'<span style="font-weight:bold;">�ɿ���ʽ��</span>'+$(ans).find("feeway").text()+'��';
				var ceducate=$(ans).find("educate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">ѧ����</span>'+$(ans).find("educate").text()+'��';
				var ccollege=$(ans).find("college").text()==""?"":'<span style="font-weight:bold;">��ҵԺУ��</span>'+$(ans).find("college").text()+'��';
				var cprof=$(ans).find("prof").text()==""?"":'<span style="font-weight:bold;">��ѧרҵ��</span>'+$(ans).find("prof").text()+'��';
				var cgraduate=$(ans).find("graduate").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ҵ���ݣ�</span>'+$(ans).find("graduate").text()+'�ꣻ';
				var carea=$(ans).find("area").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">������</span>'+$(ans).find("area").text()+'��';
				var ccurrent=$(ans).find("current").text()=="��ѡ��"?"":'<span style="font-weight:bold;">Ŀǰ״����</span>'+$(ans).find("current").text()+'��';
				var ckeyword=$(ans).find("keyword").text()==""?"":'<span style="font-weight:bold;">�����ؼ��ʣ�</span>'+$(ans).find("keyword").text()+'��';
				var crefer=$(ans).find("refer").text()==""?"":'<br /><span style="font-weight:bold;">�����ˣ�</span>'+$(ans).find("refer").text()+'��';
				var ccomment=$(ans).find("comment").text()==""?"":'<br /><span style="font-weight:bold;">��ѯҪ�㣺</span>'+$(ans).find("comment").text()+'��';
				var opedit=$(ans).find("isedit").text()==0?'':'<input type="button" value="�༭����" onclick="GotoEdit('+$(ans).find("uid").text()+');" />';
				var oprecord=$(ans).find("isrecord").text()==0?'':'<input type="button" value="���Ӽ�¼" onclick="GotoRecord('+$(ans).find("uid").text()+');" />';
				var opvisit=$(ans).find("isvisit").text()==0?'':' <input type="button" value="���ż�¼" onclick="GotoVisit('+$(ans).find("uid").text()+');" />';
				var opadvice=$(ans).find("isadvice").text()==0?'':' <input type="button" value="��ѯ����" onclick="GotoAdvice('+$(ans).find("uid").text()+');" />';
				var htmldetails="";
				htmldetails+='<hr>';
				htmldetails+='<div>'+stat+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;">';
				htmldetails+='<div>'+cname+csex+ctel+cim+ccreditid+cemergname+cemergtel+cstyle+ctender+cfoundate+cfeeway+ceducate+ccollege+cprof+cgraduate+carea+ccurrent+ckeyword+crefer+ccomment+opedit+opvisit+opadvice+'</div>';//ccurrent+cfrom
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr><ul style="color:#666;">';
				}
				$(ans).find("trace").each(function(){
					var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
				});
				htmldetails+='<li>'+oprecord+'</li></ul><hr>';
				htmldetails+= '<br/><div><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div>';
				$("#Details").html(htmldetails);
				JudgeWindowSizetoCss("#Details");
			}
		},
		complete:function(){
		}
	});
};

var GotoEdit=function(i){
	hideForm("#Details","#fade");
	hideForm("#Operate","#fade");
	GoEdit(i);
};

var GotoRecord=function(i){
	Record(i);
};

var GotoVisit=function(i){
	Tovisit(i);
};

var GotoAdvice=function(i){
	Toadvice(i);
};

var Record=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>��Ϣ��¼��</li>';
	htmlOperate+='<li style="text-align:left;"><textarea cols="51" id="OperateComment" style="width:98%; height: 58px"></textarea></li>';
	//htmlOperate+='<li style="text-align:left;color:#999;"><label style="text-align:left;line-height:30px"><input id="OperateCheck" type="checkbox" /> <span style="color:#00b6cf;font-size:14px;font-weight:bold;">�ص���ע</span>��һ�ܺ��Զ��������ѣ���</label></li>';
	htmlOperate+='<span id="SpanIsFocus" />';
	htmlOperate+='<span id="admission" />';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Record\');" value=" ȷ �� " /> | <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" ȡ �� " /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetIsFocus(i);
	GetIsAdmission(i);
	InterValID = setInterval(thisAdmissionReload, 30000);
	showForm("#Operate","#fade");
};

var ToTracks=function(){
	if($("#OperateTracksCheck").attr("checked"))$("#inputTracks").show();
	else $("#inputTracks").hide();
};

var Tovisit=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>����������ע��<label><input id="OperateCheck" type="checkbox" checked />��ע</label><textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Tovisit\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Toadvice=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li>�ͻ�<span style="font-weight:bold;">'+$("#customername"+i).text()+'</span>��ѯ���飺<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Toadvice\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Confirm=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>��ע��<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Confirm\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var GetIsFocus=function(i){
	var requests={"question":"GetIsFocus","id":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#OperateCheck").attr("checked",false);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html("");
			}
			if(1010==err){
				var htmlspanisfocus='';
				gopage=$(ans).find("answer").attr("gopage");
				if(1==$(ans).find("answer").attr("note"))htmlspanisfocus = '<hr style="border:1px dashed #ccc;"><li style="text-align:left;color:#999;">>>> <span style="font-weight:bold;color:#00b6cf;font-size:14px;line-height:30px;">�ص���ע����������</span> <input style="margin-bottom:-2px;" id="OperateTracksCheck" type="checkbox" onclick="ToTracks();" checked/> <label id="inputTracks" style="display:display">��<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+gopage+'" /></label></li>';
				else htmlspanisfocus = '<hr style="border:1px dashed #ccc;"><li style="text-align:left;color:#999;">>>> <span style="font-weight:bold;color:#00b6cf;font-size:14px;line-height:30px;">�ص���ע����������</span> <input style="margin-bottom:-2px;" id="OperateTracksCheck" type="checkbox" onclick="ToTracks();" /> <label id="inputTracks" style="display:none">��<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+gopage+'" /></label></li>';
				$("#Operateloading").html("");
				$("#SpanIsFocus").html(htmlspanisfocus);
			}
		},
		complete:function(){
		}
	});
};

var GetIsAdmission=function(i){
	var requests={"question":"GetIsAdmission","id":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				if(0<$(ans).find("list").size()){
					var htmladmission='';
					htmladmission+='<ul style="text-align:left;color:#666;line-height:25px;list-style-position:inside;background-color:#FFF;padding:5px;border-radius:6px;margin-top:8px;"><span style="font-weight:bold;">��ѯ���ԣ�</span><span style="color:#ccc;size:8pt;">(���ɶ�Ӧ�Ĳ����⸴�ƺ󷢸��ͻ�����ˢ�£����ͻ��ύ�󼴿���ʾ�ɼ��Թ���ѯ�ο���)</span>';
					$(ans).find("list").each(function(){
						htmladmission+='<li>'+$(this).attr("name");
						if($(this).find("id").text()=="")htmladmission+='<input type="button" onclick="createAdmission('+$(this).attr("id")+');" value=" �������� "/>';
						else if($(this).find("res").text()=="")htmladmission+='���� <input type="text" size=35 value="http://'+window.location.host+'/'+amsUrl+'?i='+$(this).find("linkid").text()+'"/><a style="background:none;" href="javascript:void(0);" onclick="thisAdmissionReload();"><img src="img/reload.gif" style="margin:0 0 -3px 3px;" class="tooltip" title="ˢ�²��Խ���"/></a></li>';
						else if($(this).find("res").text()!="")htmladmission+='�ɼ���<span style="color:blue;">'+$(this).find("res").text()+'</span>��</li>';
					});htmladmission+='</li>'
					htmladmission+='</ul>';
				}$('#admission').html(htmladmission);
			}
		},
		complete:function(){
		}
	});
};

var submitAdmission=function(z,q){
	var arrChk="";
	for(var i=1;i<=q;i++){
		$("input[name='s"+i+"']:checked").each(function(){arrChk+=this.value;});
		arrChk+=";";
	}
	var requests={"question":"SubmitAdmissionOver","eid":z,"selstr":arrChk};
	var htmlset="";
		$.ajax({
		type:'POST',
		url:'../'+doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#oploading").html("���Ժ�...");
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
			}
			if(1010==err){
				$("#oploading").html("");
				alert("�ύ�ɹ�����֪ͨ��ѯ���ʣ�");
			}
		},
		complete:function(){
		}
	});
};

var createAdmission=function(i){
	var requests={"question":"CreateAdmission","c":cuid,"e":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#Operateloading").html("");
				GetIsAdmission(cuid);
			}
		},
		complete:function(){
		}
	});
};

var thisAdmissionReload=function(){
	GetIsAdmission(cuid);
};

var GetFeeSels=function(){
	var requests={"question":"GetEnrollFeeSel"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				var fdate="";
				$(ans).find("option").each(function(){
					if($(ans).find("option").size()==1){
						htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" checked> '+$(this).attr("catename")+' '+$(this).attr("fee")+' '+$(this).attr("feename")+'</label></li>';
					}else{
						if(1!=$(this).attr("sel"))htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("catename")+''+$(this).attr("feename")+' '+$(this).attr("fee")+'</label></li>';
					}fdate=$(this).attr("fdate");
				});
				$("#Feesel").html(htmlconsultsel);
				$("#Dodate").attr("value",fdate);
				var htmlconsultsela ='<hr style="border:1px dashed #ccc;">';
				$(ans).find("optiona").each(function(){
					htmlconsultsela+='<li style="text-align:left;"><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> '+$(this).attr("farea")+' '+$(this).attr("catename")+' '+$(this).attr("fee")+' '+$(this).attr("feename")+'</label></li>';
				});
				$("#arealistul").html(htmlconsultsela);
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#Operate");
		}
	});
};

var ShowAll=function(){
	if($("#isfull").attr("checked")){
		$("#FeeTopay").attr("value",($("#FeePay").text().replace("��","").replace(",",""))*100/100);
	}else {
		$("#FeeTopay").attr("value","");
	}
};

var ShowDrawAll=function(){
	if($("#isfull").attr("checked")){
		$("#FeeTopay").attr("value",($("#FeePaid").text().replace("��","").replace(",",""))*100/100);
	}else {
		$("#FeeTopay").attr("value","");
	}
};

var GetFeeToPay=function(c){
	var requests={"question":"GetFeeToPay","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(1==err){
				var htmlfeesel="";
				$(ans).find("option").each(function(){
					htmlfeesel+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
				});
				$("#payway").html(htmlfeesel);
				$("#FeeTotal").html($(ans).find("answer").find("Fees").attr("total"));
				$("#FeePaid").html($(ans).find("answer").find("Fees").attr("paid"));
				$("#FeePay").html($(ans).find("answer").find("Fees").attr("topay"));
				$("#customername").html($(ans).find("answer").find("custom").attr("name"));
				$("#customercid").attr("value",$(ans).find("answer").find("custom").attr("creditid"));
				$("#sDodate").html($(ans).find("answer").find("endate").attr("name"));
				$("#Dodate").attr("value",$(ans).find("answer").find("endate").attr("name"));
				$("#Paydate").attr("value",$(ans).find("answer").find("paydate").attr("name"));
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var GetFeeToDefee=function(c){
	var requests={"question":"GetFeeToDefee","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(1==err){
				var htmlfeesel=htmldefeelist="";
				$(ans).find("option").each(function(){
					htmlfeesel+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
				});
				$(ans).find("defee").each(function(){
					htmldefeelist+='<label><input type="radio" name="Operatesel" value="'+$(this).attr("id")+'" />'+$(this).attr("name")+'��<label>';
				});
				$("#Defeelist").html(htmldefeelist);
				$("#payway").html(htmlfeesel);
				$("#FeeTotal").html($(ans).find("answer").find("Fees").attr("total"));
				$("#FeePaid").html($(ans).find("answer").find("Fees").attr("paid"));
				$("#customername").html($(ans).find("answer").find("custom").attr("name"));
				$("#customercid").attr("value",$(ans).find("answer").find("custom").attr("creditid"));
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var Enroll=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">�������ڣ�<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><div id="Feesel" style="line-height:22px;font-size:13px;"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><input id="listareafees" type="button" onclick="listareafees('+i+');" value="�������� >>>" /></li>';
	htmlOperate+='<ul id="arealistul" style="display:none;"></ul>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">�м���<input id="payiscut" type="checkbox" onclick="ShowCut();" /><label id="cutpay" style="display:none;"><br/>�������<input id="FeeCut" size=7 value="0"/><br/>���ɣ�<label><input type="checkbox" id="repu" value="�ڱ����ܣ�" onclick="ShowAppend(\'repu\');" />�ڱ����ܣ�</label><label><input type="checkbox" id="tuan" value="�ű���" onclick="ShowAppend(\'tuan\');"/>�ű���</label><label><input type="checkbox" id="self" value="�Դ��豸��" onclick="ShowAppend(\'self\');"/>�Դ��豸��</label><label><input type="checkbox" id="inner" value="�ڲ��۸���" onclick="ShowAppend(\'inner\');"/>�ڲ��۸���</label><label><input type="checkbox" id="part" value="�׶α�����" onclick="ShowAppend(\'part\');"/>�׶α�����</label><label><input type="checkbox" id="other" value="������" onclick="ShowAppend(\'other\');"/>������</label></label></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li id="customerInfo" style="display:none;text-align:left;"/>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Enroll\');" value=" ȷ �� " /> | <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" ȡ �� " /> <span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetFeeSels();
	JudgeCustomerInfo(i);
	InterValID = setInterval(thisFullcustomerReload, 30000);
	showForm("#Operate","#fade");
};

var JudgeCustomerInfo=function(i){
	var requests={"question":"JudgeCustomerInfo","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var htmlcinfo='<hr>';
				if(0!=$(ans).find("answer").attr("note"))htmlcinfo+='<span style="color:red;">���û������в��������벹�䣬���������ӷ��͸��ͻ���������д���𷢴��ˣ�<br/><input style="border-radius:5px;background:#FFF;width:90%;" type="text" value="http://'+window.location.host+'/'+cusUrl+'?'+$(ans).find("answer").attr("note")+'"> <a style="background:none;" href="javascript:void(0);" onclick="thisFullcustomerReload();"><img src="img/reload.gif" style="margin:0 0 -3px 3px;" class="tooltip" title="ˢ�²鿴����"/></a></span>';
				else htmlcinfo+='<span style="color:green;">���û���������д��������ֱ�ӱ�����</span>';
				htmlcinfo+='<hr>';
				$("#customerInfo").html(htmlcinfo);
				$("#customerInfo").show();
			}
		},
		complete:function(){
		}
	});
};

var thisFullcustomerReload=function(){
	JudgeCustomerInfo(cuid);
};

var CustomerInputs=function(i){
	var requests={"question":"CustomerInputs","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:'../'+doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadingsPar("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(2000==err){
				alert('��ַ����������ϵ��ѯ��ʦ��');
				gotoWhere('http://'+Weburl,1);
			}
			if(1==err){
				loadingsPar("h");
				cuid=i;
				var htmlinpsel;
				$(ans).find("answer").children().each(function(idx0,ele0){
					htmlinpsel="";
					$(ans).find($(ele0)[0].tagName).each(function(){
						if("input"!=$(ele0)[0].tagName){
							$(this).find("option").each(function(idx,ele){
								if("1"==$(ele).attr("sel")){
									htmlinpsel+='<option value="'+$(ele).attr("id")+'" selected>'+$(ele).attr("name")+'</option>';
								}else{
									htmlinpsel+='<option value="'+$(ele).attr("id")+'">'+$(ele).attr("name")+'</option>';
								}
								$("#"+$(ele0)[0].tagName).attr("disabled",false);
								if($(ele0)[0].tagName==$(ans).find($(ele0)[0].tagName).attr("val")){
									$("#"+$(ele0)[0].tagName).attr("disabled",true);
								}
							});
						}else{
							$(ans).find($(ele0)[0].tagName).children().each(function(idx1,ele1){
								$("#"+$(ele1)[0].tagName).attr("value",$(this).text());
								if($(ele1)[0].tagName=="cusname")$("#"+$(ele1)[0].tagName).html($(this).text());
							});
						}
					});
					$("#"+$(ele0)[0].tagName).html(htmlinpsel);
				});
			}
		},
		complete:function(){
		}
	});
};

var SubCustomerInput=function(){
	var subname=$("#name").val();
	var subsex=$("#sex").val();
	var subtel=$("#tel").attr("value");
	var subim=$("#im").attr("value");
	var subtender=$("#tender").val();
	var subfoundate=$("#foundate").val();
	var subeducate=$("#educate").val();
	var subcollege=$("#college").attr("value");
	var subprof=$("#prof").attr("value");
	var subarea=$("#inparea").val();
	var subfeeway=$("#inpfeeway").val();
	var subcurrent=$("#current").val();
	var subcreditID=$("#creditID").attr("value");
	var subemergname=$("#emergname").attr("value");
	var subemergtel=$("#emergtel").attr("value");
	var subgraduate=$("#graduate").val();
	var requests={"question":"CustomerUpdateDatas","id":cuid,"name":subname,"sex":subsex,"tel":subtel,"im":subim,"tender":subtender,"foundate":subfoundate,"educate":subeducate,"college":subcollege,"prof":subprof,"area":subarea,"current":subcurrent,"creditid":subcreditID,"emergname":subemergname,"emergtel":subemergtel,"feeway":subfeeway,"graduate":subgraduate};
	$.ajax({
		type:'POST',
		url:'../'+doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadingsPar("s");
			$("#submitedit").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(2001==err){
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
				loadingsPar("h");
			}
			if(1010==err){
				loadingsPar("h");
				$("#inptip").html("")
				alert("�ύ�ɹ���������������ϵ��ѯ���ʣ�");
				$("#cusname").html(subname);
			}
		},
		complete:function(){
		}
	});
};

var listareafees=function(){
	$("#arealistul").show();
	JudgeWindowSizetoCss("#Operate");
};

var Tofix=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�޸�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>������Ϣ��</li>';
	htmlOperate+='<hr><li style="text-align:left;">�������ڣ�<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li>';
	htmlOperate+='<hr><li style="text-align:left;"><div id="Feesel" style="line-height:22px;font-size:13px;"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><input id="listareafees" type="button" onclick="listareafees('+i+');" value="�������� >>>" /></li>';
	htmlOperate+='<ul id="arealistul" style="display:none;"></ul>';
	htmlOperate+='<hr><li style="text-align:left;">�м���<input id="payiscut" type="checkbox" onclick="ShowCut();" /><label id="cutpay" style="display:none;"><br/>�������<input id="FeeCut" size=7 value="0"/><br/>���ɣ�<label><input type="checkbox" id="repu" value="�ڱ����ܣ�" onclick="ShowAppend(\'repu\');" />�ڱ����ܣ�</label><label><input type="checkbox" id="tuan" value="�ű���" onclick="ShowAppend(\'tuan\');"/>�ű���</label><label><input type="checkbox" id="self" value="�Դ��豸��" onclick="ShowAppend(\'self\');"/>�Դ��豸��</label><label><input type="checkbox" id="inner" value="�ڲ��۸���" onclick="ShowAppend(\'inner\');"/>�ڲ��۸���</label><label><input type="checkbox" id="part" value="�׶α�����" onclick="ShowAppend(\'part\');"/>�׶α�����</label><label><input type="checkbox" id="other" value="������" onclick="ShowAppend(\'other\');"/>������</label></label></li>';
	htmlOperate+='<hr><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Tofix\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetFixSels(i);
	showForm("#Operate","#fade");
};

var ToReply=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�����޸�<span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>�����۸���</li>';
	htmlOperate+='<li style="text-align:left;"><span style="color:#DF3A01;">���޸ı����۸����ύ������������Ա������������ȷ�Ϻ���Ч����</span></li>';
	htmlOperate+='<hr><li style="text-align:left;">�����۸���<input id="FeeTopay" size=5 value="0"/><span style="color:#999;">���ѽ�<span id="ispaid"></span>��<span id="topaid"></span>��</span></li>';
	htmlOperate+='<hr><li style="text-align:left;">�޸�ԭ����<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'ToReply\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetReplysels(i);
	showForm("#Operate","#fade");
};

var GetReplysels=function(i){
	var requests={"question":"GetReplysel","rid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#Operateloading").html("");
				$("#FeeTopay").attr("value",$(ans).find("answer").attr("note"));
				$("#ispaid").html($(ans).find("answer").attr("gopage"));
				$("#topaid").html($(ans).find("answer").attr("other").indexOf("-") >= 0?"���"+$(ans).find("answer").attr("other").replace('-',''):"���ɣ�"+$(ans).find("answer").attr("other"));
			}
		},
		complete:function(){
		}
	});
};

var GetFixSels=function(i){
	var requests={"question":"GetEnrollFixSel","fid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlconsultsel ="";
				$(ans).find("option").each(function(){
					htmlconsultsel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" '+($(this).attr("issel")==1 ? "checked":"")+'> '+$(this).attr("catename")+' '+$(this).attr("fee")+' '+$(this).attr("feename")+'</label></li>';
				});
				$("#Feesel").html(htmlconsultsel);
				$("#Dodate").attr("value",$(ans).find("enstr").attr("edate"));
				if(0<$(ans).find("enstr").attr("cut")){
					$("#payiscut").attr("checked",true);
					$("#FeeCut").attr("value",$(ans).find("enstr").attr("cut"));
					var comm=$(ans).find("enstr").attr("comm");
					$("#OperateComment").attr("value",comm);
					$("#cutpay").show();
					if(comm.indexOf($("#repu").attr("value")) >=0) $("#repu").attr("checked",true);
					if(comm.indexOf($("#tuan").attr("value")) >=0) $("#tuan").attr("checked",true);
					if(comm.indexOf($("#self").attr("value")) >=0) $("#self").attr("checked",true);
					if(comm.indexOf($("#inner").attr("value")) >=0) $("#inner").attr("checked",true);
					if(comm.indexOf($("#part").attr("value")) >=0) $("#part").attr("checked",true);
					if(comm.indexOf($("#other").attr("value")) >=0) $("#other").attr("checked",true);
				}
				var htmlconsultsela ='<hr style="border:1px dashed #ccc;">';
				$(ans).find("optiona").each(function(){
					if($(this).attr("issel")==1)$("#arealistul").show();
					htmlconsultsela+='<li style="text-align:left;"><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" '+($(this).attr("issel")==1 ? "checked":"")+'> '+$(this).attr("farea")+' '+$(this).attr("catename")+' '+$(this).attr("fee")+' '+$(this).attr("feename")+'</label></li>';
				});
				$("#arealistul").html(htmlconsultsela);
			}
		},
		complete:function(){
		}
	});
};

var ShowAppend=function(c){
	if($("#"+c).attr("checked")){
		$("#OperateComment").append($("#"+c).attr("value"));
	}else{
		$("#OperateComment").attr("value",$("#OperateComment").attr("value").replace(($("#"+c).attr("value")),""));
	}
};

var ShowCut=function(){
	if($("#payiscut").attr("checked")){
		$("#cutpay").show();
	}else{
		$("#cutpay").hide();
		$("#FeeCut").attr("value","0");
		$("#repu").attr("checked",false);
		$("#tuan").attr("checked",false);
		$("#self").attr("checked",false);
		$("#inner").attr("checked",false);
		$("#part").attr("checked",false);
		ShowAppend('repu');
		ShowAppend('tuan');
		ShowAppend('self');
		ShowAppend('inner');
		ShowAppend('part');
	}
};

var Toclass=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#customername"+i).text()+'</span>ѡ���༶��<hr><div id="Operatesel"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><span style="font-weight:bold;font-size:13px;">>>> ����֪ͨ��Email��<input id="customercid" size=25 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" disabled/></span></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">������ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Toclass\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetClassSels(i);
	showForm("#Operate","#fade");
};

var GetClassSels=function(c){
	var requests={"question":"GetClassSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlclasssel ="";
				var emailaddress="";
				htmlclasssel+='<li><label><input type="radio" value="-1" name="Operatesel"> <span style="font-weight:bold;font-size:13px;">δȷ���༶</span><span></span></label></li><hr style="border:1px dashed #ccc;">';
				$(ans).find("option").each(function(){
					emailaddress=$(this).attr("semail");
					var isopenclass=(1==$(this).attr("isopen"))?'���ѿ��Σ�':'';
					var shownlimit="&nbsp;&nbsp;";
					if($(this).attr("slimit")!=""){
						if(parseInt($(this).attr("snum"))==0)shownlimit='<span style="color:green">���ա�</span>';
						else if(parseInt($(this).attr("snum"))==parseInt($(this).attr("slimit")))shownlimit='<span style="color:#FF9900">������Ա��</span>';
						if(parseInt($(this).attr("snum"))< parseInt($(this).attr("slimit")))shownlimit='<span style="color:blue"> δ����'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
						if(parseInt($(this).attr("snum"))> parseInt($(this).attr("slimit")))shownlimit='<span style="color:red"> ��Ա��'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
					}
					htmlclasssel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> <span style="font-weight:bold;font-size:14px;">'+$(this).attr("name")+'</span>'+shownlimit+'<span style="size:11px;color:#999">�������ڣ�'+$(this).attr("open")+isopenclass+'</span></label></li>';
				});
				$("#customercid").attr("value",emailaddress);
				$("#Operatesel").html(htmlclasssel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var PayOff=function(i,q){
	var requests={"question":"CounterTopay","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#Operate").html("");
				cuid=i;
				var htmlOperate="";
				$("#FeeTopay").attr("value","");
				htmlOperate+='<li style="text-align:left;">�������ڣ�<span id="sDodate"></span><input id="Dodate" type="hidden" disabled/></li><hr style="border:1px dashed #ccc;">';
				htmlOperate+='<li style="text-align:left;">�ɷ����ڣ�<input class="Wdate" id="Paydate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li><hr style="border:1px dashed #ccc;">';
				htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;"></span>��֤���ţ�<input id="customercid" size=21 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" /></li>';
				htmlOperate+='<hr style="border:1px dashed #ccc;">';
				htmlOperate+='<li style="text-align:left;">Ӧ�ɷ��ã�<span id="FeeTotal" style="font-size:14px;font-weight:bold;"></span>���ѽɷ��ã�<span id="FeePaid" style="font-size:14px;font-weight:bold;"></span>��</li>';
				htmlOperate+='<li style="text-align:left;">���ɷ��ã�<span id="FeePay" style="font-size:14px;color:#0101DF;font-weight:bold;"></span>��</li>';
				htmlOperate+='<li style="text-align:left;">���νɷѣ�<select id="payway"></select>&nbsp;&nbsp;<input id="FeeTopay" size=8 value=""/>&nbsp;&nbsp;<input id="isfull" type="checkbox" onclick="ShowAll();" />ʣ���� </li>';
				htmlOperate+='<hr><li style="text-align:left;">������ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 34px"></textarea></li>';
				htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'PayOff\');" value="ȷ��" /> <input name="cancel" onclick="CloseWPay(\'Operate\','+q+');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
				$("#Operate").html(htmlOperate);
				GetFeeToPay(i);
				showForm("#Operate","#fade");
			}else{
				$("#Operate").html("");
				cuid=i;
				var htmlOperate="";
				htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;">'+$(ans).find("oFees").attr("name")+'</span>��ԭ�����ѣ�'+$(ans).find("oFees").attr("orgfee")+'���ѽɣ�'+$(ans).find("oFees").attr("feepaid")+'��</li>';
				htmlOperate+='<hr style="border:1px dashed #ccc;">';
				htmlOperate+='<li style="text-align:left;color:blue;">�����۸��ɡ�'+$(ans).find("oFees").attr("staff")+'���ύ�޸����룬�����۸��޸�Ϊ<span style="color:red;font-weight:bold;">'+$(ans).find("oFees").attr("newfee")+'</span><br />ԭ����'+$(ans).find("oFees").attr("comment")+'</li>';
				htmlOperate+='<li style="text-align:center;">�Ƿ�ȷ�ϣ�</li><hr style="border:1px dashed #eee;">';
				htmlOperate+='<li><label><input style="background-color:#90EE90;" id="submitoperate" name="input" type="button" onclick="toFixConfirm('+$(ans).find("oFees").attr("fid")+');" value=" ����ͨ�� " /></label> &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; <label><input style="background-color:red;" id="submitoperate2" name="input" type="button" onclick="toFixDeny('+$(ans).find("oFees").attr("fid")+');" value=" �ܾ� " /></label><hr style="border:1px dashed #ccc;"><input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" �ر� " /><span id="Operateloading"></span></li>';
				$("#Operate").html(htmlOperate);
				showForm("#Operate","#fade");
			}
		},
		complete:function(){
		}
	});
};

var CloseWPay=function(i,q){
	if(0<q){
		GetCondition();
		hideForm("#"+i,"#fade");
	}else hideForm("#"+i,"#fade");
};

var DropConfirm=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;"></span>��</li>';
	htmlOperate+='<li style="text-align:left;">�ѽ��ɷ��ã�<span id="FeePaid" style="font-size:14px;"></span>��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;color:blue;">�ύ�ˣ�<span id="DropStaff"></span></li>';
	htmlOperate+='<li style="text-align:left;color:green;">��ѧԭ����<span id="DropContent"></span><br /><span style="color:red;">�����û����˿�Ҫ����ͬ�ⲿ���˿���ɷ�����Ȼ��Ч��</span ></li>';
	htmlOperate+='<li style="text-align:left;">�Ƿ�ȷ�ϣ� <input id="submitoperate" name="input" type="button" onclick="toDrawConfirm('+i+');" value=" ͬ�� " />&nbsp;&nbsp;|&nbsp;&nbsp;<input id="submitoperate" name="input" type="button" onclick="toDenyDrawConfirm('+i+');" value=" �ܾ� " /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="�ر�" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
	GetConfirmToDraw(i);
};

var GetConfirmToDraw=function(c){
	var requests={"question":"GetConfirmToDraw","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html("");
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
				GetCondition();
			}
			if(1==err){
				$("#FeePaid").html($(ans).find("answer").find("Fees").attr("paid"));
				$("#customername").html(($(ans).find("answer").find("custom").attr("name")==$(ans).find("answer").find("custom").attr("stuname")?$(ans).find("answer").find("custom").attr("name"):($(ans).find("answer").find("custom").attr("name")+'��'+$(ans).find("answer").find("custom").attr("stuname")+'��')));
				$("#DropContent").html($(ans).find("answer").find("content").attr("name"));
				$("#DropStaff").html($(ans).find("answer").find("content").attr("staff"));
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var toDrawConfirm=function(i){
 var requests={"question":"toDrawConfirm","fid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var toDenyDrawConfirm=function(i){
 var requests={"question":"toDenyDrawConfirm","fid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var Lookadvice=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-size:13px;">'+$("#customername"+i).text()+'��ѯ���飺</span>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<ul id="advices"></ul>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li><input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="�ر�" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
	GetLookadvice(i);
};

var GetLookadvice=function(i){
	var requests={"question":"LookAdvice","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#advices").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmlAdvice="";
				$(ans).find("adlist").each(function(){
					htmlAdvice+='<li style="text-align:left;">'+$(this).attr("atime")+((1==$(this).attr("astat"))?'<span style="color:red">(new)</span>':'')+' ����'+$(this).attr("aname")+' >> '+$(this).attr("acontent")+'</li>';
				});
				$("#advices").html(htmlAdvice);
			}
		},
		complete:function(){
		}
	});
};

var toFixConfirm=function(i){
 var requests={"question":"ToFixConfirm","fid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submitoperate").attr("disabled",true);
			$("#submitoperate2").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(2000==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}else{
				PayOff($(ans).find("answer").attr("note"),1);
			}
		},
		complete:function(){
		}
	});
};

var toFixDeny=function(i){
 var requests={"question":"ToFixDeny","fid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submitoperate").attr("disabled",true);
			$("#submitoperate2").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var Drawback=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	$("#FeeTopay").attr("value","");
	htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;"></span>���������ڣ�<span id="sDodate"></span>';
	htmlOperate+='<li style="text-align:left;">�����ѣ�<span id="FeeTotal" style="font-size:14px;font-weight:bold;"></span>��</li>';
	htmlOperate+='<li style="text-align:left;">�ѽɷ��úϼƣ�<span id="FeePaid" style="font-size:14px;font-weight:bold;color:#FF0000;"></span>��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�˿����ڣ�<input class="Wdate" id="Paydate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li><hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�˿����<select id="payway"></select>&nbsp;&nbsp;<input id="FeeTopay" size=8 value=""/>&nbsp;&nbsp;<input id="isfull" type="checkbox" onclick="ShowDrawAll();" />ȫ��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">������ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 34px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Drawback\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetFeeToPay(i);
	showForm("#Operate","#fade");
};

var PayPlus=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	$("#FeeTopay").attr("value","");
	htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;"></span>���������ڣ�<span id="sDodate"></span>';
	htmlOperate+='<li style="text-align:left;">Ӧ�ɷ��ã�<span id="FeeTotal" style="font-size:14px;font-weight:bold;"></span>��</li>';
	htmlOperate+='<li style="text-align:left;">�ѽɷ��ã�<span id="FeePaid" style="font-size:14px;font-weight:bold;color:green;"></span>��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�������ڣ�<input class="Wdate" id="Paydate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li><hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�������<select id="payway"></select>&nbsp;&nbsp;<input id="FeeTopay" size=8 value=""/></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">������ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 34px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'PayPlus\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetFeeToPay(i);
	showForm("#Operate","#fade");
};

var Defees=function(i){
	$("#Operate").html("");
	cuid=i;
	var htmlOperate="";
	$("#FeeTopay").attr("value","");
	htmlOperate+='<li style="text-align:left;">�ͻ�������<span id="customername" style="font-size:13px;font-weight:bold;"></span>��<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�����ѣ�<span id="FeeTotal" style="font-size:14px;font-weight:bold;"></span>���ѽɷ��úϼƣ�<span id="FeePaid" style="font-size:14px;font-weight:bold;color:#FF0000;"></span>��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">�����Դ��豸�ѣ�<select id="payway"></select>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;"><label id="Defeelist"></label>';
	htmlOperate+='<li style="text-align:left;"><input id="FeeTopay" style="display:none;" size=8 value="" disabled/></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;">������ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 28px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toOperate(\'Defees\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetFeeToDefee(i);
	showForm("#Operate","#fade");
};

var gotoConsultPage=function(p){
	consultpage=p;
	GetCondition();
};

var changeConsultPage=function(){
	gotoConsultPage($("#changeconsultpage").val());
};

var checkMyself=function(i){
	Limitarea=0;
	Limitconsult=i;
	Limitcustom=0;
	consultpage=1;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var checkCustomerMyself=function(i){
	Limitarea=0;
	Limitconsult=0;
	Limitcustom=i;
	consultpage=1;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var getData=function(){
	var requests={"question":"GetData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"consult":Limitconsult,"custom":Limitcustom,"ztender":Limittender,"zfrom":Limitfrom,"status":Limitstatus,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val(),"focus":Limitfocus,"category":Limitcategory,"tips":LimitTips};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var consultgroupop=$(ans).find("answer").attr("groupop");
				var consultgroupnm=$(ans).find("answer").attr("groupnm");
				var consultgroupop2=$(ans).find("answer").attr("groupop2");
				var consultgroupnm2=$(ans).find("answer").attr("groupnm2");
				var htmlgroupop=htmlgroupop2='';
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="17%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeConcultOrder(\'time\');" class="tooltip" title="��¼��ʱ������" >¼������<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��¼��ʱ������" /></a> | <a href="javascript:void(0);" onclick="changeConcultOrder(\'optime\');" class="tooltip" title="����������ʱ������" >��������<img id="imgoptime" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������ʱ������" /></a></th>';
					htmlthead+='<th width="25%" style="text-align:left;padding-left:20px;">���� | ��ϵ��ʽ</th>';
					if(0==consultcols){
						htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeConcultOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a> | ¼��</th>';
						htmlthead+='<th width="20%">��ѯ���� | ԺУ��չ</th>';
					}
					if(1==consultcols){
						htmlthead+='<th width="7%">¼��</th>';
						htmlthead+='<th width="20%">��ѯ���� | ԺУ��չ</th>';
					}
					if(2==consultcols){
						htmlthead+='<th width="7%">¼��</th>';
						htmlthead+='<th width="20%">��ѯ���� | ԺУ��չ</th>';
					}
					if(3==consultcols){
						htmlthead+='<th width="20%" colspan="2">��ѯ���� | ԺУ��չ</th>';
					}
					if(consultgroupop2!="null"){
						htmlthead+='<th width="1%"><input id="allcheck2" name="checkall2" type="checkbox" onclick="javascript:selectAllOp2(\''+consultgroupop2+'\');" style="margin:0 4px -3px 0;" /></th>';
					}
					htmlthead+='<th width="30%"><a href="javascript:void(0);" onclick="changeConcultOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a> | ����</th>';
					if(consultgroupop!="null"){
						htmlgroupop='<a href="javascript:void(0);" onclick="groupOption(\''+consultgroupop+'\');" id="positionA">'+consultgroupnm+'</a> <span style="color:#666666;size:9pt;" onclick="selectAllOpA(\''+consultgroupop+'\')">ȫѡ</span><img src="./img/arrow_rgt.png" border=0 style="margin:0 1px -6px 3px;" />';
						htmlthead+='<th width="1%"><input id="allcheck" name="checkall" type="checkbox" onclick="javascript:selectAllOp(\''+consultgroupop+'\');" style="margin:0 4px -3px 0;" /></th>';
					}
					var isShowSize=0;
					if(consultgroupop2!="null"){
						isShowSize=1;
						htmlgroupop2='<a href="javascript:void(0);" onclick="groupOption2(\''+consultgroupop2+'\');">'+consultgroupnm2+'</a> <span style="color:#666666;size:9pt;" onclick="selectAllOpA2(\''+consultgroupop2+'\')">ȫѡ</span><img src="./img/arrow_rgt.png" border=0 id="positionB" />';
					}
					$("#opgroup").html(htmlgroupop2+htmlgroupop);
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var consultid=$(this).find("consultid").text();
						var channelid=$(this).find("channelid").text();
						var htmlstrback="";
						var isfocus=$(this).find("focus").text();
						var isopfocus=$(this).find("opfocus").text();
						var isred=$(this).find("red").text();
						var category=$(this).find("category").text();
						var isadd=$(this).find("isadd").text();
						var scolor="";
						var htmlcheckbox='<input name="null" type="checkbox" style="margin:0 4px -3px 0;" disabled />';
						var htmlcheckbox2='<input name="null" type="checkbox" style="margin:0 4px -3px 0;" disabled />';
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						var tr="";
						if(isred==0)tr='<tr>';
						if(isred==1)tr='<tr class="flag">';
						if(isred==2)tr='<tr class="flagt">';
						if(isred==3)tr='<tr class="flag">';
						htmltbody+=tr;
						htmltbody+='<td>'+$(this).find("time").text()+'<span style="color:#999;font-size:15px;" class="tooltip" title="��������ʱ�� '+$(this).find("utime").text()+'">��</span></td>';
						var htmlisop=(1==isopfocus)?'<img src="img/f'+isfocus+'.gif" /> ':'<img src="img/f'+isfocus+'.gif" /> ';//<a href="javascript:toFocus('+dataid+','+(isfocus==1?0:1)+');" title="���ó�'+(isfocus==1?'��ͨ':'�ص���ע')+'�ͻ�" class="tooltip" >
						htmltbody+='<td style="text-align:left;padding-left:8px;">'+htmlisop+'<span id="customername'+dataid+'" style="font-weight: bold;">'+$(this).find("name").text()+'</span><br/><span style="color:#999;font-size:11px;">Tel:'+$(this).find("tel").text()+' QQ:'+$(this).find("qq").text()+'</span>';
						htmltbody+='<br/>';
						$(this).find("op0").children().each(function(idx,ele){
							htmltbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
						});
						if(3==consultcols){
							htmltbody+=$(this).find("custom").text()==""?"":"<span style='color:#BBB'> ("+$(this).find("custom").text()+"¼��)</span>";
						}
						htmltbody+="</td>";
						if(0==consultcols){
							htmltbody+="<td>"+$(this).find("locate").text()+($(this).find("custom").text()==""?"":"��"+$(this).find("custom").text()+"��")+"</td>";
							htmltbody+="<td>"+$(this).find("consult").text();
						}
						if(1==consultcols){
							htmltbody+="<td>"+$(this).find("custom").text()+"</td>";
							htmltbody+="<td>"+$(this).find("consult").text();
						}
						if(2==consultcols){
							htmltbody+="<td>"+$(this).find("custom").text()+"</td>";
							htmltbody+="<td>"+$(this).find("consult").text();
						}
						if(3==consultcols){
							htmltbody+='<td colspan="2">'+$(this).find("consult").text();
						}
						if(""!=isadd)htmltbody+='<span style="color:red;" class="tooltip" title="'+isadd+'">+</span>';
						htmltbody+='<br/>';
						$(this).find("op1").children().each(function(idx,ele){
							htmlstrback+='<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+','+consultid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
							if($(ele).text()=="ָ��"&&consultgroupop=="groupassign")htmlcheckbox='<input name="'+consultgroupop+'" type="checkbox" value="'+dataid+'" style="margin:0 4px -3px 0;" onclick="Noallselect(\''+consultgroupop+'\');" />';
							if($(ele).text()=="ת��"&&consultgroupop2=="groupresign")htmlcheckbox2='<input name="'+consultgroupop2+'" type="checkbox" value="'+dataid+'" style="margin:0 4px -3px 0;" onclick="Noallselect2(\''+consultgroupop2+'\');" />';
							if(0<channelid&&$(ele).text()=="�˻�")htmlstrback=htmlstrback.replace('<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+','+consultid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>','');
							else if(category!=2&&($(ele).text()=="ת����"||$(ele).text()=="��������"))htmlstrback=htmlstrback.replace('<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+','+consultid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>','');
						});htmltbody+=htmlstrback;
						htmltbody+=consultgroupop2=="null"?"":'<td>'+htmlcheckbox2+'</td>';
						var istoclass=$(this).find("istoclass").text();
						if(3==isred){
							htmltbody+='</td><td><span style="color:red;">������ѧ</span>';
							htmltbody+='<input type="button" onclick="DropConfirm('+dataid+');" value=" ���� " />';
						}else if(2==isred&&(500==sid||700==sid)){
							htmltbody+='</td><td><span style="color:red;">�ļ۴�ȷ��</span>';
							htmltbody+='<input type="button" onclick="PayOff('+dataid+');" value=" ��ʵ " />';
						}else{
							if(0<isred){
								if(2==isred){
									htmltbody+='</td><td><span style="color:green;text-decoration:none;">����</span>';
									htmltbody+='<input type="button" onclick="Lookadvice('+dataid+');" value=" �鿴 " />';
								}else htmltbody+='</td><td><span style="color:red;">������</span>';
							}else{
								htmltbody+='</td><td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span>';
							}htmltbody+='<br/>';
							$(this).find("op2").children().each(function(idx,ele){
								if($(ele)[0].tagName != 'Topay'){
									if(($(ele)[0].tagName != 'Toclass')||(istoclass==1)) htmltbody+='<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
								}
								if($(ele).text()=="����")htmlcheckbox='<input name="'+consultgroupop+'" type="checkbox" value="'+dataid+'" style="margin:0 4px -3px 0;" onclick="Noallselect(\''+consultgroupop+'\');" />';
							});
						}
						htmltbody+='</td>'
						htmltbody+=consultgroupop=="null"?"":'<td>'+htmlcheckbox+'</td>';
						htmltbody+='</tr>';
					});
				}
				var htmlstatics=htmlstaticsPlus="";
				var Staticstitle=(""==consultkey)?($(ans).find("staticstitle").attr("title").indexOf(">")>=0 ? "��"+$(ans).find("staticstitle").attr("title")+"��<br />":"��"+$(ans).find("staticstitle").attr("title")+"��"):"";
				var StaticsUser=(0!=$(ans).find("staticstitle").attr("name"))? "��<span style='font-weight:bold;'>"+$(ans).find("staticstitle").attr("name")+"</span>��<br />":"";
				var isList=$(ans).find("staticstitle").attr("list");
				var isPList=$(ans).find("staticstitle").attr("Plist");
				var isSList=$(ans).find("staticstitle").attr("Slist");
				var isEList=$(ans).find("staticstitle").attr("Elist");
				var isTList=$(ans).find("staticstitle").attr("Tlist");
				var isOList=$(ans).find("staticstitle").attr("Olist");
				var isDList=$(ans).find("staticstitle").attr("Dlist");
				if(""==consultkey)htmlstatics = '<span style="color: #999;text-shadow:1px 1px 1px #E0E0E0;">'+StaticsUser+Staticstitle+'����ͳ��</span><hr>';
				htmlstatics+='<div style="text-align:center;text-shadow:1px 1px 1px #E0E0E0;">';
				if(0<isSList)htmlstatics+='<input type="button" value=" ���������б� " onclick="OutOnlinelist();"/><hr style="width:80%">';
				if(0<isEList)htmlstatics+='<input type="button" value=" �������߱����б� " onclick="OutEnrolllist();"/><hr style="width:80%">';
				$(ans).find("statics").each(function(){
					htmlstatics+=$(this).attr("name")+'��<span style="color:#00b6cf;font-size:8pt;text-shadow:1px 1px 1px #E0E0E0;">'+$(this).attr("value")+'</span>';
					if(0<isTList&&$(this).attr("name").indexOf('�����ص���')>=0)htmlstatics+='<br /><input type="button" value=" ���� " onclick="ShowSubmitEnlist();"/>';
					if(0<isOList&&$(this).attr("name")=='�����˹ص���')htmlstatics+='<br /><input type="button" value=" ���� " onclick="ShowSubmitEnlistOther();"/>';
					if(0<isList&&$(this).attr("name")=='�ص�����')htmlstatics+='<br /><input type="button" value=" ��ϸ " onclick="ShowEnlist();"/>';
					if(0<isDList&&$(this).attr("name")=='�˵���')htmlstatics+='<br /><input type="button" value=" ���� " onclick="ShowDrawslist();"/>';
					if(0<isList&&$(this).attr("name")=='�Ѹ���������')htmlstatics+='<br /><input type="button" value=" ��ϸ " onclick="ShowPayOfflistAdm();"/>';
					htmlstatics+=($(this).attr("name")=="�������Ǽ�"||$(this).attr("name")=="����������"||$(this).attr("name")=="����ȷ��"||$(this).attr("name")=="�ص�����"||$(this).attr("name")=="�����ص���"||$(this).attr("name")=="�����˹ص���"||$(this).attr("name")=="������ת����"||$(this).attr("name")=="�˵���"||$(this).attr("name")=="�Ѹ���������"||$(this).attr("name")=="���ɵǼ�"||$(this).attr("name")=="���ɱ���")?'<hr style="width:80%;">':'<br />';
					htmlstatics+=$(this).attr("name")=="�����ص�����"?" >>> <br>":"";
					if(0<isPList&&$(this).attr("name")=='�Ѹ���������')htmlstaticsPlus='<hr style="width:80%"><input type="button" value=" �������� " onclick="ShowPayOfflist();"/>';
				});
				htmlstatics+='</div>'+htmlstaticsPlus;
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoConsultPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoConsultPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoConsultPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoConsultPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeConsultPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			$("#statics").show();
			if(0<isShowSize)$("#positionB").css("margin","0 "+($(window).width()-$("#allcheck2").offset().left-($(window).width()-$("#positionA").offset().left)-16)+"px -3px 0");
			if(""!=htmltbody){
				senfei("consulttbody","#FFF","#eee","#ddd","#F5D0A9","#FFEEDD","#FFE5CA","#FDD3AE","#F5D0A9","#DDE1FF","#C9CEFF","#C1C7FF","#D1D5FF");
			}
		},
		complete:function(){
			displayConsultOrder();
			$('.tooltip').toolTip();
		}
	});
};

var OutOnlinelist=function(){
	var requests={"question":"OutOnlineData","date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2000==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				document.location.href(doUrl+"output/?type=onlinedata&date="+Limitdate+"&d0="+$("#date0").val()+"&d1="+$("#date1").val());
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var OutEnrolllist=function(){
	var requests={"question":"OutEnrollData","area":Limitarea,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2000==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				document.location.href(doUrl+"output/?type=enrolldata&area="+Limitarea+"&date="+Limitdate+"&d0="+$("#date0").val()+"&d1="+$("#date1").val());
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var OutClassStudentlist=function(){
	var requests={"question":"OutStudentData","class":Limitclass};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2000==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				document.location.href(doUrl+"output/?type=studentdata&cid="+Limitclass);
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var displayConsultlistOrder=function(){
	$("#imglisttime").hide();
	$("#imglistjtime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	$("#imglistadd").hide();
	$("#imglistcut").hide();
	if(1==consultlistorder)$("#imglist"+consultlistorderV).attr("src",htmlimgDesc);
	if(2==consultlistorder)$("#imglist"+consultlistorderV).attr("src",htmlimgAsc);
	$("#imglist"+consultlistorderV).show();
};

var gotoConsultlistPage=function(p){
	consultlistpage=p;
	GetEnlist();
};

var gotoConsultPayOfflistPage=function(p){
	consultlistpage=p;
	GetPayOfflist();
};

var changeConsultlistPage=function(){
	gotoConsultlistPage($("#changeconsultlistpage").val());
};

var changeConsultPayOfflistPage=function(){
	gotoConsultPayOfflistPage($("#changeconsultlistpage").val());
};

var changeConcultlistOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	$("#imglistadd").hide();
	$("#imglistcut").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetEnlist();
	$("#imglist"+v).show();
};

var changeConcultPayOfflistOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	$("#imglistadd").hide();
	$("#imglistcut").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetPayOfflist();
	$("#imglist"+v).show();
};

var ShowEnlist=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetEnlist();
};

var ShowPayOfflist=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetPayOfflist();
};

var ShowSubmitEnlist=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetSubmitEnrolllist();
};

var gotoConsultSubmitEnlistPage=function(p){
	consultlistpage=p;
	GetSubmitEnrolllist();
};

var changeConsultSubmitEnlistPage=function(){
	gotoConsultSubmitEnlistPage($("#changeconsultlistpage").val());
};

var changeConcultSubmitEnlistOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistjtime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetSubmitEnrolllist();
	$("#imglist"+v).show();
};

var GetSubmitEnrolllist=function(){
	var requests={"question":"GetSubmitEnlist","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"�ύ��������");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="11%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOrder(\'time\');" class="tooltip" title="��ʱ������" >��������<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="8%">����</th>';
					htmllistthead+='<th width="20%">ԺУ</th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOrder(\'jtime\');" class="tooltip" title="��ʱ������" >¼������<img id="imglistjtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%">�ص���</th>';
					htmllistthead+='<th width="14%">ҵ��������</th>';
					htmllistthead+='<th width="11%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOrder(\'stat\');" class="tooltip" title="��״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("college").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("jointime").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("belongto").text()+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultSubmitEnlistPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
		}
	});
};

var ShowDrawslist=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetSubmitEnrollDraw();
};

var GetSubmitEnrollDraw=function(){
	var requests={"question":"GetSubmitEnrollDraw","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"�˵�����");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeConcultDrawlistOrder(\'time\');" class="tooltip" title="��ʱ������" >�˵�ʱ��<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="6%">����</th>';
					htmllistthead+='<th width="13%">ԺУ</th>';
					htmllistthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeConcultDrawlistOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeConcultDrawlistOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="9%">������</th>';
					htmllistthead+='<th width="13%">ҵ��������</th>';
					htmllistthead+='<th width="20%">ԭ��</th>';
					htmllistthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeConcultDrawlistOrder(\'stat\');" class="tooltip" title="��״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("college").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("belongto").text()+'</td>';
						htmllisttbody+='<td>'+($(this).find("drawcomm").text()==""?'-':$(this).find("drawcomm").text())+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultDrawlistPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultDrawlistPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultDrawlistPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultDrawlistPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultDrawlistPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
			JudgeWindowSizetoCss("#ListDetail");
		}
	});
};

var gotoConsultDrawlistPage=function(p){
	consultlistpage=p;
	GetSubmitEnrollDraw();
};

var changeConsultDrawlistPage=function(){
	gotoConsultDrawlistPage($("#changeconsultlistpage").val());
};

var changeConcultDrawlistOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetSubmitEnrollDraw();
	$("#imglist"+v).show();
};

var ShowSubmitEnlistOther=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetSubmitEnrolllistOther();
};

var gotoConsultSubmitEnlistOtherPage=function(p){
	consultlistpage=p;
	GetSubmitEnrolllistOther();
};

var changeConsultSubmitEnlistOtherPage=function(){
	gotoConsultSubmitEnlistOtherPage($("#changeconsultlistpage").val());
};

var changeConcultSubmitEnlistOtherOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetSubmitEnrolllistOther();
	$("#imglist"+v).show();
};

var GetSubmitEnrolllistOther=function(){
	var requests={"question":"GetSubmitEnlistOther","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"������������");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="12%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOtherOrder(\'time\');" class="tooltip" title="��ʱ������" >����<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="10%">����</th>';
					htmllistthead+='<th width="18%">ԺУ</th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOtherOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOtherOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%">������</th>';
					htmllistthead+='<th width="17%">ҵ��������</th>';
					htmllistthead+='<th width="13%"><a href="javascript:void(0);" onclick="changeConcultSubmitEnlistOtherOrder(\'stat\');" class="tooltip" title="��״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("college").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("belongto").text()+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistOtherPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistOtherPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistOtherPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultSubmitEnlistOtherPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultSubmitEnlistOtherPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
		}
	});
};

var GetEnlist=function(){
	var requests={"question":"GetEnlist","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"������������");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'time\');" class="tooltip" title="������ʱ������" >��������<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="������ʱ������" /></a> </th>';
					htmllistthead+='<th width="18%">����</th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="15%">��ѯ����</th>';
					htmllistthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'add\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistadd" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'cut\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcut" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="18%"><a href="javascript:void(0);" onclick="changeConcultlistOrder(\'stat\');" class="tooltip" title="����ǰ״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+($(this).find("listadd").text()==1?'<span style="color:green">��</span>':'')+'</td>';
						htmllisttbody+='<td>'+($(this).find("listcut").text()==1?'<span style="color:red">��</span>':'')+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultlistPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultlistPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultlistPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultlistPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultlistPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
		}
	});
};

var GetPayOfflistAdm=function(){
	var requests={"question":"GetPayOfflistAdm","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"������������");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'time\');" class="tooltip" title="��ʱ������" >����<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="18%">����</th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="15%">��ѯ����</th>';
					htmllistthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'add\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistadd" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'cut\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcut" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="18%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistAdmOrder(\'stat\');" class="tooltip" title="��״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+($(this).find("listadd").text()==1?'<span style="color:green">��</span>':'')+'</td>';
						htmllisttbody+='<td>'+($(this).find("listcut").text()==1?'<span style="color:red">��</span>':'')+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistAdmPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistAdmPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistAdmPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistAdmPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultPayOfflistAdmPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
		}
	});
};

var ShowPayOfflistAdm=function(){
	showForm("#ListDetail","#fade");
	$("#Listtitle").html("");
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	consultlistpage=1;
	consultlistorder=1;
	consultlistorderV='time';
	GetPayOfflistAdm();
};

var changeConcultPayOfflistAdmOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistlocate").hide();
	$("#imgliststat").hide();
	$("#imglistcategory").hide();
	$("#imglistadd").hide();
	$("#imglistcut").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetPayOfflistAdm();
	$("#imglist"+v).show();
};

var changeConsultPayOfflistAdmPage=function(){
	gotoConsultPayOfflistAdmPage($("#changeconsultlistpage").val());
};

var gotoConsultPayOfflistAdmPage=function(p){
	consultlistpage=p;
	GetPayOfflistAdm();
};

var GetPayOfflist=function(){
	var requests={"question":"GetPayOfflist","page":consultlistpage,'orderV':consultlistorderV,'order':consultlistorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmllistthead='';
			var htmllisttbody='';
			var htmllisttfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#Listtitle").html((($("#area").val()>0 ? $("#area").find("option:selected").text():"")+($("#consult").val()>0 ? $("#consult").find("option:selected").text():"")+$(ans).find("answer").attr("datestr")).replace("ȫ��","")+"������������");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var consultlisttotalpages=$(ans).find("answer").attr("pages");
				var consultlistcols=$(ans).find("answer").attr("cols");
				if(0==consultlisttotal){
					htmllistthead+='<tr>';
					htmllistthead+='<th width="100%"><span style="color:#FF0000">'+consultlistcols+'</span></th>';
					htmllistthead+='</tr>';
				}else{
					htmllistthead+='<tr>';
					htmllistthead+='<th width="12%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistOrder(\'time\');" class="tooltip" title="��ʱ������" >����<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmllistthead+='<th width="10%">����</th>';
					htmllistthead+='<th width="18%">ԺУ</th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistOrder(\'category\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglistlocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmllistthead+='<th width="10%">������</th>';
					htmllistthead+='<th width="17%">ҵ��������</th>';
					htmllistthead+='<th width="13%"><a href="javascript:void(0);" onclick="changeConcultPayOfflistOrder(\'stat\');" class="tooltip" title="��״̬����" >��ǰ״̬<img id="imgliststat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmllistthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==-100)scolor="#A4A4A4";if(sid==0)scolor="#AAA";if(sid==100)scolor="#610B0B";if(sid==200)scolor="#58ACFA";if(sid==300)scolor="#086A87";if(sid==400)scolor="#9F81F7";if(sid==500)scolor="#298A08";if(sid==600)scolor="#6E6E6E";if(sid==700)scolor="#B45F04";
						htmllisttbody+='<tr>';
						htmllisttbody+='<td>'+$(this).find("time").text()+'</td>';
						htmllisttbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("college").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("category").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("locate").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("consult").text()+'</td>';
						htmllisttbody+='<td>'+$(this).find("belongto").text()+'</td>';
						htmllisttbody+='<td style="color:'+scolor+'">'+$(this).find("stat").text()+'</td>';
						htmllisttbody+='</tr>';
					});
				}
				
				var plist=1;
				if(1< Number(consultlistpage)){
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistPage('1');>��ҳ</a>��";
					plist=Number(consultlistpage)-1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistPage('"+plist+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultlistpage) && Number(consultlisttotalpages)>Number(consultlistpage)){
					htmllisttfooter+="|��";
				}
				
				if(Number(consultlisttotalpages)>Number(consultlistpage)){
					plist=Number(consultlistpage)+1;
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistPage('"+plist+"');>��һҳ</a>��";
					htmllisttfooter+="<a href='javascript:void(0);' onclick=gotoConsultPayOfflistPage('"+consultlisttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consultlisttotalpages)){
					htmllisttfooter+="���ڡ�<label><select id='changeconsultlistpage' onchange='changeConsultPayOfflistPage();'>";
					for(var j=1;j<=Number(consultlisttotalpages);j++){
						if(j==consultlistpage){
							htmllisttfooter+="<option value='"+j+"' selected='selected'>"+j+"/"+consultlisttotalpages+"</option>";
						}else{
							htmllisttfooter+="<option value='"+j+"'>"+j+"/"+consultlisttotalpages+"</option>";
						}
					}
					htmllisttfooter+="</select></label>��ҳ��";
				}
				htmllisttfooter+="�� "+consultlisttotal+" ����¼";
			}
			$("#detailthead").html(htmllistthead);
			$("#detailtbody").html(htmllisttbody);
			$("#detailtfooter").html(htmllisttfooter);
			if(""!=htmllisttbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayConsultlistOrder();
		}
	});
};

var selectAllOp=function(n){
	if($("#allcheck").attr("checked"))$("input[name='"+n+"']").attr("checked",true);
	else $("input[name='"+n+"']").attr("checked",false);
};

var selectAllOpA=function(n){
	if(!$("#allcheck").attr("checked")){
		$("input[name='"+n+"']").attr("checked",true);
		$("#allcheck").attr("checked",true);
	}else{
		$("#allcheck").attr("checked",false);
		$("input[name='"+n+"']").attr("checked",false);
	}
};

var Noallselect=function(n){
	if(0<$("input[name='"+n+"']:checkbox").not("input:checked").length)$("#allcheck").attr("checked",false);
	else $("#allcheck").attr("checked",true);
};

var groupOption=function(n){
	f_str="";
	var gsize=$("input[name='"+n+"']:checked").length;
	if(0==gsize)alert("û��ѡ���κ���Ŀ��");
	else{
		$("input[name='"+n+"']:checked").each(function(){
		   f_str+=$(this).attr("value")+"|";
		});f_str=f_str.substr(0,f_str.length-1);
		if("groupconfirm"==n){
			$("#Operate").html("");
			var htmlOperate="";
			htmlOperate+='<li><span style="font-weight:bold;font-size:13px;">����ѡ����[ '+gsize+' ]���ͻ����Ƿ���������</span><br/>��ע��<textarea cols="51" id="OperateComment" style="width:70%; height: 38px"></textarea></li>';
			htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="gOperateConfirm();" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
			$("#Operate").html(htmlOperate);
			showForm("#Operate","#fade");
		}
		if("groupassign"==n){
			$("#Operate").html("");
			var htmlOperate="";
			htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:12px;">��Ϊ[ '+gsize+' ]���ͻ�����ָ��</span><br/>ѡ����ѯ���ʣ�<hr><div id="Operatesel" style="line-height:22px;font-size:13px;"></div><hr></li>';
			htmlOperate+='<li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
			htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="gOperateAssign();" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
			$("#Operate").html(htmlOperate);
			GetConsultSels();
			showForm("#Operate","#fade");
		}
	}
};

var gOperateConfirm=function(){
	var c=$("#OperateComment").attr("value");
	var requests={"question":"gOperateConfirm","groupuid":f_str,"comment":c};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				topMain();
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var gOperateAssign=function(){
	var c=$("#OperateComment").attr("value");
	var d=$('input[name=Operatesel]:checked').val();
	var requests={"question":"gOperateAssign","groupuid":f_str,"comment":c,"did":d};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				topMain();
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var gOperateResign=function(){
	var c=$("#OperateComment").attr("value");
	var d=$('input[name=Operatesel]:checked').val();
	var requests={"question":"gOperateResign","groupuid":f_str,"comment":c,"did":d};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				$("#Operateloading").html("�����쳣������ϵ����Ա");
				$("#submitoperate").attr("disabled",false);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				topMain();
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var selectAllOp2=function(n){
	if($("#allcheck2").attr("checked"))$("input[name='"+n+"']").attr("checked",true);
	else $("input[name='"+n+"']").attr("checked",false);
};

var selectAllOpA2=function(n){
	if(!$("#allcheck2").attr("checked")){
		$("input[name='"+n+"']").attr("checked",true);
		$("#allcheck2").attr("checked",true);
	}else{
		$("#allcheck2").attr("checked",false);
		$("input[name='"+n+"']").attr("checked",false);
	}
};

var Noallselect2=function(n){
	if(0<$("input[name='"+n+"']:checkbox").not("input:checked").length)$("#allcheck2").attr("checked",false);
	else $("#allcheck2").attr("checked",true);
};

var groupOption2=function(n){
	f_str="";
	var gsize=$("input[name='"+n+"']:checked").length;
	if(0==gsize)alert("û��ѡ���κ���Ŀ��");
	else{
		$("input[name='"+n+"']:checked").each(function(){
		   f_str+=$(this).attr("value")+"|";
		});f_str=f_str.substr(0,f_str.length-1);
		if("groupresign"==n){
			$("#Operate").html("");
			var htmlOperate="";
			htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:12px;">��Ϊ[ '+gsize+' ]���ͻ�����ת����ѯ����</span><hr><div id="Operatesel" style="line-height:22px;font-size:13px;"></div><hr></li>';
			htmlOperate+='<li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
			htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="gOperateResign();" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
			$("#Operate").html(htmlOperate);
			GetConsultSels();
			showForm("#Operate","#fade");
		}
	}
};

var toFocus=function(i,d){
	var requests={"question":"CustomToFocus","id":i,"d":d};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				GetCondition();
			}
		},
		complete:function(){
		}
	});
};

var displayConsultOrder=function(){
	$("#imgtime").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	$("#imgoptime").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeConcultOrder=function(v){
	$("#imgtime").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	$("#imgoptime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetCondition();
	$("#img"+v).show();
};

var getLocalstaff=function(){
	var requests={"question":"GetStaff","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var isConsult=0;
				var isCustom=0;
				
				var htmlselConsult='<option value="0">ȫ��</option>';
				var htmlselCustom='<option value="0">ȫ��</option>';
				if(0<$(ans).find("consult").size()){
					$(ans).find("consult").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isConsult=1;
							htmlselConsult+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						}else{
							htmlselConsult+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						}
					});
				}else{
					htmlselConsult='<option value="0">��</option>';
				}
				if(0<$(ans).find("custom").size()){
					$(ans).find("custom").each(function(){
						if(Limitcustom==$(this).attr("id")){
							isCustom=1;
							htmlselCustom+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselCustom+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselCustom='<option value="0">��</option>';
				}
				if(0==isConsult){
					Limitconsult=0;
				}
				$("#consult").html(htmlselConsult);
				if(0==isCustom){
					Limitcustom=0;
				}
				$("#custom").html(htmlselCustom);
				html="";
				if(0<$(ans).find("tips").size()){
					html+=htmlhr;
					$(ans).find("tips").each(function(){
						if(1==LimitTips){
							html+='<span style="font-weight:bold;">��ʾ��</span><a class="active" href="javascript:void(0);" onclick="setLimitTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}else{
							html+='<span style="font-weight:bold;">��ʾ��</span><a href="javascript:void(0);" style="color:#0080FF;" onclick="setLimitTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}
					});	
				}
				$("#tips").html(html);
				if(0==isConsult)$("#myself").attr('class','');
			}
		},
		complete:function(){
			getData();
		}
	});
};

var setLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	LimitTips=0;
	getLocalstaff();
	$("#search").val("");
	consultkey="";
	$("#inpStatics").attr('value',(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$("#"+Limitdate).text().replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'����ѯҵ������ ');
};

var setLimitConsult=function(){
	Limitconsult=$("#consult").val();
	Limitcustom=0;
	consultpage=1;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitCustom=function(){
	Limitcustom=$("#custom").val();
	Limitconsult=0;
	consultpage=1;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitTender=function(c){
	consultpage=1;
	Limittender=$("#ztender").val();
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitFrom=function(c){
	consultpage=1;
	Limitfrom=$("#zfrom").val();
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitStatus=function(c){
	consultpage=1;
	Limitstatus=c;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitFocus=function(c){
	consultpage=1;
	Limitfocus=c;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitCategory=function(c){
	consultpage=1;
	Limitcategory=c;
	LimitTips=0;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitTips=function(c){
	Limitarea=0;
	Limitconsult=0;
	Limitcustom=0;
	Limittender=0;
	Limitfrom=0;
	Limitdate="all";
	Limitstatus="all";
	Limitcategory="all";
	Limitfocus="all";
	LimitTips=1;
	consultorder=1;
	consultpage=1;
	GetCondition();
	$("#search").val("");
	consultkey="";
};

var checkmsg=function(){
	var requests={"question":"CheckMsg"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#msg").css("width","auto");
			$("#msg").css("background","rgba(255, 255, 255, 0.8) none repeat scroll 0 0");
			$("#msg").html(htmlimgo);
			$("#msg").fadeIn();
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#msg").hide();
			}
			if(1==err){
				var htmlmsg="";				
				$(ans).find("msg").each(function(){
					htmlmsg+='<hr><ul><li style="text-align:left;color:#fff;">���ԣ�'+$(this).attr("from")+'��'+$(this).attr("time")+'����Ϣ��</li><h2 style="text-align:left;text-indent:2em;">'+$(this).attr("msg")+'</h2><li style="text-align:right;color:#fff;size=2;"><a href="javascript:void(0);" onclick="msgread('+$(this).attr("id")+');" style="color:blue;text-decoration:none;font-size:9px;" >����֪���ˡ�</a></li></ul><hr>';
				});
				var htmlmsgend=(1<$(ans).find("msg").size())?'<a href="javascript:void(0);" onclick="Allmsgread();" style="color:blue;text-decoration:none;font-size:9px;" >��ȫ���Ѷ���</a> | ':'';
				htmlmsg+='<p style="text-align:right;">'+htmlmsgend+'<a href="javascript:void(0);" onclick="CloseOver(\'msg\');" style="color:#666666;text-decoration:none;font-size:9px;" >���رա�</a></p>';
				$("#msg").css("width","400px");
				$("#msg").css("background","#F5D0A9");
				$("#msg").html(htmlmsg);
			}
		},
		complete:function(){
		}
	});
};

var Allmsgread=function(i){
	var requests={"question":"AllMsgRead"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				checkmsg();
				topMain();
			}
		},
		complete:function(){
		}
	});
};

var msgread=function(i){
	var requests={"question":"MsgRead","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				checkmsg();
				topMain();
			}
		},
		complete:function(){
		}
	});
};

var checkset=function(){
	var requests={"question":"CheckSet"};
	var htmlset="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var connect="S"==$(ans).find("answer").attr("type")?"<li>ѧ���ţ�"+$(ans).find("answer").attr("user")+"</li>":"<li>�ֻ��ţ�"+$(ans).find("answer").attr("user")+"</li><li>Email��"+$(ans).find("answer").attr("email")+"</li>";
				var last = $(ans).find("answer").attr("last");
				var lastip = $(ans).find("answer").attr("lastip");
				var htmlset=connect+'<li>�ϴε�½ʱ�䣺'+last+'</li><li>�ϴε�½IP��'+lastip+'</li><hr><li>�޸ĵ�½����</li><p id="errmsg" style="color:red;"></p><li>�µ����룺<input type="password" id="password" size="15" /></li><li>����ȷ�ϣ�<input type="password" id="confirmpsw" size="15" /></li><li><input type="button" value="�޸�" onclick="ChangePwd();" /> <input type="button" value="�ر�" onclick="CloseOver(\'set\');" /></li></ul>';
				$("#set").html(htmlset);
				$('#msg').hide();
				$("#password").keypress(function(e){
					if('13'==e.keyCode){
						$("#confirmpsw").focus();
					}
				});
				$("#confirmpsw").keypress(function(e){
					if('13'==e.keyCode){
						ChangePwd();
					}
				});
			}
		},
		complete:function(){
		}
	});
};

var logout=function(){
	var requests={"question":"Logout"};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
		},
		complete:function(){
		}
	});
};

var CloseOver=function(a){
	$("#"+a).hide();
}

var gotoWhere=function(u,t){
	switch(t){
		case 1:{
			top.location.replace(u);
		}break;
	}
};

var loadings=function(v){
	$("#load").html(htmlimg);
	switch(v){
		case "s":{
			showForm("#load","#over");
		}break;
		case "h":{
			hideForm("#load","#over");
		}break;
	}
}

var loadingsPar=function(v){
	$("#load").html(htmlimgPar);
	switch(v){
		case "s":{
			showForm("#load","#over");
		}break;
		case "h":{
			hideForm("#load","#over");
		}break;
	}
}

var showForm=function(l,f){
	$(l).show();
	$(f).show();
	$("#Operate").css({position:"fixed"});
};

var hideForm=function(l,f){
	$(l).hide();
	$(f).hide();
};

/************************count*****************************/
var changeCountOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetCountCondition();
	$("#img"+v).show();
};

var displayCountOrder=function(){
	$("#imgtime").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
}

var changeCountPage=function(){
	gotoCountPage($("#changeconsultpage").val());
};

var gotoCountPage=function(p){
	consultpage=p;
	GetCountCondition();
};

var GetCountCondition=function(){
	var requests={"question":"GetCountCondition"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
			//alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				var htmlIsCountStaticsshow=htmlIsCountStaticsSelfshow='';
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setCountLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">��ѯ���ʣ�</span><select id="consult" onchange=setCountLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("channel").size()){
					html+='<label id="selchannel"><span style="font-weight:bold;">ԺУ��չ��</span><select id="channel" onchange=setLimitChannel();>';
					if(0==Limitchannel){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("channel").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("channel").each(function(){
							if($(this).attr("id")==Limitchannel){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label><span id='countstatics'/>";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("consult").size()||0<$(ans).find("channel").size()){
					html+=htmlhr;
				}
				$("#areasel").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setCountLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
							if(0<$(ans).find("isBondCountStatics").size())htmlIsCountStaticsshow='<label><input id="inpBondStatics" style="margin-left:20px;" type="button" onclick="ShowBondCounterStatics();" value=" '+(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'������Ա����ѧԱ��ͳ�� " /></label>';
							if("all"!=Limitdate&&0<$(ans).find("isCountStatics").size())htmlIsCountStaticsshow+='<label><input id="inpStatics" style="margin-left:20px;" type="button" onclick="ShowDateCounterStatics();" value="��'+$(this).attr("name").replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'���������漰��Ŀ " /></label>';
							if("all"!=Limitdate&&0<$(ans).find("isCountStaticsUser").size())htmlIsCountStaticsshow+='<label><input id="inpStaticsUser" style="margin-left:20px;" type="button" onclick="ShowCountDateStatics();" value="'+(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$(this).attr("name").replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'��ҵ����ϸ " /></label>';
							if("all"!=Limitdate&&0<$(ans).find("isCountStaticsUserSelf").size())htmlIsCountStaticsSelfshow+='<label><hr style="border:1px dashed #eee;"><input id="inpStaticsUser" type="button" onclick="ShowCountDateStatics();" value="'+(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$(this).attr("name").replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'������ҵ����ϸ " /></label>';
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setCountLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
				$("#countstatics").html(htmlIsCountStaticsshow);
				$("#selfstatics").html(htmlIsCountStaticsSelfshow);
			}
		},
		complete:function(){
			getCountLocalstaff();
		}
	});
};

var ShowBondCounterStatics=function(){
	showForm("#perf","#fade");
	var requests={"question":"GetBondCounterStatics","area":Limitarea};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#perf").html("����ͳ��... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmldata='';
				var locatenum=staffnum=linenum=0;
				htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+(Limitarea>0?$('#area').find("option:selected").text():"")+'��'+$(ans).find("answer").attr("dname")+'��������Ա�����༶����ͳ��</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]</div>';
				htmldata+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
				htmldata+='<tr style="height:26px;"><td style="width:8%;background-color:#00b6cf;">����</td><td style="width:6%;background-color:#00b6cf;">��Ա</td><td style="width:10%;background-color:#00b6cf;">ְ�񼶱�</td><td style="background-color:#00b6cf">�༶</td>';
				for(var i=1;i <= $(ans).find("answer").attr("days"); i++){
					htmldata+='<td style="background-color:#F7BE81">'+(('0'+i).substr(-2,2))+'</td>';
				}htmldata+='</tr>';
				locatenum=$(ans).find("Locate").size();
				$(ans).find("Locate").each(function(){
					linenum=0;
					staffnum=$(this).find("staff").size();
					if(0<staffnum){
						$(this).find("staff").each(function(){
							linenum=linenum+parseInt($(this).attr("classnum")==0?1:$(this).attr("classnum"));
						});
						htmldata+='<tr><td rowspan="'+linenum+'" style="background-color:#FFFFCC;">'+$(this).attr("name")+'</td>';
						$(this).find("staff").each(function(){
							var numClassline=0<$(this).attr("classnum")?$(this).attr("classnum"):1;
							htmldata+='<td rowspan="'+numClassline+'" style="background-color:#eee;">'+$(this).attr("name")+'</td><td rowspan="'+numClassline+'" style="background-color:#DFDFDF;">'+$(this).attr("posite")+'��L'+$(this).attr("level")+'��</td>';
							$(this).find("class").each(function(){
								htmldata+='<td style="background-color:#eee;">'+$(this).attr("name")+'</td>';
								$(this).find("d").each(function(){
									htmldata+='<td>'+$(this).text()+'</td>';
								});htmldata+='</tr>';
							});
						});
					}
				});
				if(0==staffnum&&1==locatenum){
					htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$(ans).find("answer").attr("dname")+'��������Ա�����༶����ͳ��</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]</div>';
					htmldata+='<table border="0" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
					htmldata+='<tr style="height:26px;"><td><span style="text-align:center;color:red;">������û���κν�����</span></td></tr></table>';
				}else{
					htmldata+='</table>';
				}
				$("#perf").html(htmldata+'<br/>');
				JudgeWindowSizetoCss("#perf");
			}
		},
		complete:function(){
		}
	});
};

var ShowDateCounterStatics=function(){
	showForm("#perf","#fade");
	var requests={"question":"GetDateCounterStatics","date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#perf").html("����ͳ��... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin2(\'perf\');">�ر�</a>]');
		},
		error:function(e){
			alert("e");
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				alert("��ʱ���������漰�������������ݣ�");
				hideForm("#perf","#fade");
			}
			if(1==err){
				var htmldata='';
				htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+$('#inpStatics').attr("value")+'</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseWin2(\'perf\');">�ر�</a>]</div>';
				htmldata+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
				htmldata+='<tr style="height:26px;background-color:#CCFFFF;""><td rowspan="2">����</td><td colspan="4">��ѯ</td><td colspan="4">����</td><td colspan="3">�ɷ�</td>';
				htmldata+='</tr>';
				htmldata+='<tr style="background-color:#CCFFFF;"><td>��ѯ����</td><td>��ѯ��</td><td>������</td><td>���������ڵ�</td><td>��������</td><td>��������</td><td>������</td><td>�Ͽ�����</td><td>�ɿ�</td><td>�˿�</td><td>�������</td>';
				htmldata+='</tr>';
				$(ans).find("customer").each(function(){
					var Numrowspan = $(this).attr("count");
					var ccount=0;
					htmldata+='<tr style="background-color:#FFF;"><td rowspan="'+Numrowspan+'">'+$(this).find("name").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s1").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s2").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s3").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s4").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s5").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s6").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s7").text()+'</td><td rowspan="'+Numrowspan+'">'+$(this).find("s8").text()+'</td>';
					$(this).find("count").each(function(){
						ccount++;
						var apphtmldata='<td>'+$(this).find("credit").text()+'</td><td>'+$(this).find("debit").text()+'</td><td>'+$(this).find("carea").text()+'</td>';
						if(1<ccount)htmldata+='<tr style="background-color:#FFF;">'+apphtmldata;
						else htmldata+=apphtmldata;
					});
					htmldata+='</tr>';
				});htmldata+='</tr></table>';
				$("#perf").html(htmldata+'<br/>');
				JudgeWindowSizetoCss("#perf");
			}
		},
		complete:function(){
		}
	});
};

var setCountLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	$("#inpStaticsUser").attr('value',(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'��'+$("#"+Limitdate).text().replace("ѡ������>>>",$('#date0').val()+'��'+$('#date1').val())+'��ҵ����ϸ ');
	$("#inpBondStatics").attr('value',(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'����ѧԱ��ͳ��(����) ');
	getCountLocalstaff();
};

var setCountLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetCountCondition();
};

var chkCountDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	$("#inpBondStatics").attr('value',(Limitarea>0?" "+$('#area').find("option:selected").text():"")+'����ѧԱ��ͳ��(����) ');
	$("#inpStatics").attr('value','��'+$('#date0').val()+'��'+$('#date1').val()+'���������漰��Ŀ ');
	$("#inpStaticsUser").attr('value','��'+$('#date0').val()+'��'+$('#date1').val()+'��ҵ����ϸ ');
	getCounterData();
};

var getCounterData=function(){
	var requests={"question":"getCounterData","page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"consult":Limitconsult,"channel":Limitchannel,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var counttotal=$(ans).find("answer").attr("all");
				var counttotalpages=$(ans).find("answer").attr("pages");
				var countcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==counttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+countcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="18%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeCountOrder(\'time\');" class="tooltip" title="��ʱ������" >����ʱ��<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmlthead+='<th width="7%">�ͻ�</th>';
					htmlthead+='<th width="19%">������ | ����</th>';
					htmlthead+='<th width="8%">;��</th>';
					htmlthead+='<th width="11%">�տ�</th>';
					htmlthead+='<th width="11%">�˿�</th>';
					htmlthead+='<th width="18%">ҵ��������</th>';
					htmlthead+='<th width="8%">������</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var wid=$(this).find("wayid").text();
						var consultid=$(this).find("consultid").text();
						var Countflag =(0!=$(this).find("isinput").text())?'<a style="color:#CCC;text-decoration:none;" class="tooltip" title="����ʱ�䣺'+$(this).find("isinput").text()+'" href="javascript:void(0);">��</a>':"";
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+Countflag+"</td>";
						htmltbody+="<td>"+$(this).find("cutomername").text()+"</td>";
						htmltbody+="<td>"+$(this).find("consultorg").text()+" | "+$(this).find("locate").text()+"</td>";
						htmltbody+="<td><span id='payway"+dataid+"'>"+$(this).find("way").text()+(0<$(this).find("isdoWay").text()?'<a href="javascript:void(0);" style="font-size:14px;color:green;text-decoration:none;" onclick="getChangePayway('+dataid+','+wid+');">��</a>':'')+"</span></td>";
						htmltbody+="<td style='color:Green'>"+($(this).find("credit").text()==0 ? "-":$(this).find("credit").text());
						htmltbody+="<td style='color:Red'>"+($(this).find("debit").text()==0 ? "-":$(this).find("debit").text());
						htmltbody+="<td>"+$(this).find("isperson").text();
						htmltbody+="<td>"+$(this).find("counter").text();
						htmltbody+="</td></tr>";
					});
				}
				var htmlstatics="";
				var Staticstitle=$(ans).find("staticstitle").attr("title").indexOf(">")>=0 ? "��"+$(ans).find("staticstitle").attr("title")+"��<br />":"��"+$(ans).find("staticstitle").attr("title")+"��";
				var StaticsName=(""!=$(ans).find("staticstitle").attr("name"))? "��<span style='font-weight:bold;'>"+$(ans).find("staticstitle").attr("name")+"</span>��<br />":(0<Limitarea?"��<span style='font-weight:bold;'>"+$("#area").find("option:selected").text()+"</span>��<br />":"");
				htmlstatics = '<span style="color: #999;text-shadow:1px 1px 1px #E0E0E0;">'+StaticsName+Staticstitle+'����ͳ��</span>';
				htmlstatics+='<div style="text-align:center;text-shadow:1px 1px 1px #E0E0E0;">';
				$(ans).find("statics").each(function(){
					htmlstatics+=$(this).attr("name")+'��<span style="color:'+($(this).attr("name").indexOf("��")>=0 ? '#ff0000':'#31B404')+';">'+$(this).attr("value")+'</span><br />';
				});
				htmlstatics+='</div>';
				htmlstatics += '<hr>';
				if($(ans).find("staticsUsertitle").attr("name")!=""){
					htmlstatics+='<div style="text-align:center;font-size:8pt;text-shadow:1px 1px 1px #E0E0E0;">';
					htmlstatics+='��<span style="font-weight:bold;">'+$(ans).find("staticsUsertitle").attr("name")+'</span>��ҵ��<br /> >>> <br />';
					$(ans).find("staticsUser").each(function(){
						htmlstatics+=$(this).attr("name")+'��<span style="color:'+($(this).attr("name").indexOf("��")>=0 ? '#ff0000':($(this).attr("name").indexOf("��ǰ")>=0 ?'#4169E1':'#31B404'))+';">'+$(this).attr("value")+'</span><br />';
						htmlstatics+=$(this).attr("name")=="�����˿�"||$(this).attr("name")=="50%�˿�"||$(this).attr("name")=="�����˿�"||$(this).attr("name")=="�����˿�"?'<hr style="width:80%">':'';
					});
					htmlstatics+='</div>';
					htmlstatics += '<hr>';
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCountPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCountPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(counttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(counttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCountPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCountPage('"+counttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(counttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeCountPage();'>";
					for(var i=1;i<=Number(counttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+counttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+counttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+counttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			$("#statics").show();
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayCountOrder();
			$('.tooltip').toolTip();
		}
	});
};

var getChangePayway=function(i,s){
	var requests={"question":"getChangePayway"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmlwaysel='<select id="selpayway'+i+'" onchange="changePayWay('+i+');">';
				$(ans).find("option").each(function(){
					htmlwaysel+='<option value="'+$(this).attr("id")+'" '+(s==$(this).attr("id")?'selected':'')+'>'+$(this).attr("name")+'</option>';
				});htmlwaysel+="</select>";
				$("#payway"+i).html(htmlwaysel);
			}
		},
		complete:function(){
		}
	});
};

var changePayWay=function(i){
	var wid=$('#selpayway'+i).val();
	var requests={"question":"changePayWay","pid":i,"wid":wid};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				GetCountCondition();
			}
		},
		complete:function(){
		}
	});
};

var setLimitChannel=function(){
	Limitchannel=$("#channel").val();
	Limitconsult=0;
	consultpage=1;
	GetCountCondition();
	$("#search").val("");
	consultkey="";
};

var getCountLocalstaff=function(){
	var requests={"question":"GetCountStaff","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var isConsult=0;
				var isChannel=0;
				var htmlselConsult='<option value="0">ȫ��</option>';
				var htmlselChannel='<option value="0">ȫ��</option>';
				if(0<$(ans).find("staff").size()){
					$(ans).find("staff").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isConsult=1;
							htmlselConsult+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselConsult+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselConsult='<option value="0">��</option>';
				}
				if(0<$(ans).find("channel").size()){
					$(ans).find("channel").each(function(){
						if(Limitchannel==$(this).attr("id")){
							isChannel=1;
							htmlselChannel+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselChannel+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselChannel='<option value="0">��</option>';
				}
				if(0==isConsult){
					Limitconsult=0;
				}
				$("#consult").html(htmlselConsult);
				if(0==isChannel){
					Limitchannel=0;
				}
				$("#channel").html(htmlselChannel);
			}
		},
		complete:function(){
			getCounterData();
		}
	});
};

var setCountLimitConsult=function(){
	Limitconsult=$("#consult").val();
	Limitchannel=0;
	consultpage=1;
	GetCountCondition();
};

var ShowCountDateStatics=function(t){
	showForm("#perf","#fade");
	var requests={"question":"GetCountDateStatics","area":Limitarea,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#perf").html("����ͳ��... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmldata='';
				var locatenum=staffnum=0;
				htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+$('#inpStaticsUser').attr("value")+'</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#00b6cf;">���ɼ��㹫ʽ��D = A-B-C; �� D>0 ʱ E=D, ���� E=0; ����H = (E + F) * G ;</span></div>';
				htmldata+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
				htmldata+='<tr style="height:26px;"><td style="width:10%;background-color:#00b6cf;">����</td><td style="width:10%;background-color:#00b6cf;">��Ա</td><td style="width:6%;background-color:#00b6cf;">ְλ</td><td style="background-color:#00b6cf">����ȫ������(A)</td><td style="background-color:#00b6cf">������������(B)</td><td style="background-color:#00b6cf">������ѯ����(C)</td><td style="background-color:#00b6cf">�Ѳ���ҵ��(D)</td><td style="background-color:#F7BE81">����ҵ������(E)</td><td style="background-color:#F7BE81">���ӽ�������(F)</td><td style="background-color:#F7BE81">���ɱ���(G)</td><td style="background-color:#F7BE81">����������(H)</td></tr>';
				locatenum=$(ans).find("Locate").size();
				var ts1=ts2=ts3=ts4=ts5=ts6=ts7=countstaff=0;
				$(ans).find("Locate").each(function(){
					staffnum=$(this).find("staff").size();
					if(0<staffnum){
						htmldata+='<tr id="staff'+$(this).attr("id")+'"><td rowspan="'+staffnum+'" style="background-color:#FFFFCC;">'+$(this).attr("name")+'</td>';
						$(this).find("staff").each(function(){
							countstaff++;
							htmldata+='<td style="background-color:#eee;">'+$(this).attr("name")+'</td><td style="background-color:#DFDFDF;">'+$(this).attr("posite")+'</td><td class="allc">'+$(this).find("s1").text()+'</td><td class="allc">'+$(this).find("s2").text()+'</td><td class="allc">'+$(this).find("s3").text()+'</td><td style="background-color:#eee;" class="allc">'+$(this).find("s4").text()+'</td><td style="background-color:#F5ECCE;" class="allc">'+$(this).find("s5").text()+'</td><td style="background-color:#F5ECCE;" class="allc">'+$(this).find("s6").text()+'</td><td style="background-color:#F5ECCE;">'+$(this).find("s8").text()+'</td><td style="background-color:#F5ECCE;" class="allc">'+$(this).find("s7").text()+'</td></tr>';
							ts4=parseFloat(ts4)+parseFloat($(this).find("s4").text());
							ts5=parseFloat(ts5)+parseFloat($(this).find("s5").text());
							ts6=parseFloat(ts6)+parseFloat($(this).find("s6").text());
							ts7=parseFloat(ts7)+parseFloat($(this).find("s7").text());
						});
					}
				});
				if(0==staffnum&&1==locatenum){
					htmldata='<div style="height:26px;text-align: center; margin-top:5px;"><b>'+$('#inpStaticsUser').attr("value")+'</b>&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:void(0);" onclick="CloseWA(\'perf\');">�ر�</a>]</div>';
					htmldata+='<table border="0" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
					htmldata+='<tr style="height:26px;"><td><span style="text-align:center;color:red;">������û���κν�����</span></td></tr></table>';
				}else{
					if(1<locatenum||1<staffnum){
						htmldata+='<tr style="background-color:#FFFFCC"><td colspan="3" style="height:26px;font-weight:bold;">�ϼƣ�</td><td>-</td><td>-</td><td>-</td><td class="allc">'+ts4+'</td><td class="allc" style="background-color:#F7BE81">'+ts5+'</td><td class="allc" style="background-color:#F7BE81">'+ts6+'</td><td style="background-color:#F7BE81">-</td><td class="allc" style="background-color:#F7BE81">'+ts7+'</td></tr></table>';
					}else htmldata+='</table>';
				}
				htmldata+='<div style="color:#999;float:right;">* ע������������Ϊ������Աҵ�����ܺͣ�������ת�ڻ���ɾ����Ա������Ӧ��Ա�������Ǿ�ȷ�ģ�����Ϊ��Աҵ���������ݡ�</div>';
				$("#perf").html(htmldata+'<br/>');
				$(".allc").formatCurrency();
				JudgeWindowSizetoCss("#perf");
			}
		},
		complete:function(){
		}
	});
};

/**************************************************************/
var changeTraceOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetTraceCondition();
	$("#img"+v).show();
};

var displayTraceOrder=function(){
	$("#imgtime").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeTracePage=function(){
	gotoTracePage($("#changeconsultpage").val());
};

var gotoTracePage=function(p){
	consultpage=p;
	GetTraceCondition();
};

var getTraceLocalstaff=function(){
	var requests={"question":"GetStaff","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var isConsult=0;
				var isCustom=0;
				
				var htmlselConsult='<option value="0">ȫ��</option>';
				var htmlselCustom='<option value="0">ȫ��</option>';
				if(0<$(ans).find("consult").size()){
					$(ans).find("consult").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isConsult=1;
							htmlselConsult+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						}else{
							htmlselConsult+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						}
					});
				}else{
					htmlselConsult='<option value="0">��</option>';
				}
				if(0<$(ans).find("custom").size()){
					$(ans).find("custom").each(function(){
						if(Limitcustom==$(this).attr("id")){
							isCustom=1;
							htmlselCustom+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselCustom+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselCustom='<option value="0">��</option>';
				}
				if(0==isConsult){
					Limitconsult=0;
				}
				$("#consult").html(htmlselConsult);
				if(0==isCustom){
					Limitcustom=0;
				}
				$("#custom").html(htmlselCustom);
			}
		},
		complete:function(){
			getTraceData();
		}
	});
};

var setTraceLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getTraceLocalstaff();
	$("#search").val("");
	consultkey="";
};

var setTraceLimitConsult=function(){
	Limitconsult=$("#consult").val();
	Limitcustom=0;
	consultpage=1;
	GetTraceCondition();
	$("#search").val("");
	consultkey="";
};

var setTraceLimitCustom=function(){
	Limitcustom=$("#custom").val();
	Limitconsult=0;
	consultpage=1;
	GetTraceCondition();
	$("#search").val("");
	consultkey="";
};

var setTraceLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetTraceCondition();
	$("#search").val("");
	consultkey="";
};

var GetTraceCondition=function(){
	var requests={"question":"GetTraceConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setTraceLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">��ѯ����/ԺУ��չ��</span><select id="consult" onchange=setTraceLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+($(this).attr("pos")==35?'(ԺУ��չ)':'')+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("custom").size()){
					html+='<label id="selcustom"><span style="font-weight:bold;">���߿ͷ���</span><select id="custom" onchange=setTraceLimitCustom();>';
					if(0==Limitcustom){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("custom").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("custom").each(function(){
							if($(this).attr("id")==Limitcustom){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("consult").size()||0<$(ans).find("custom").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setTraceLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setTraceLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getTraceLocalstaff();
		}
	});
};

var TraceSearcher=function(){
	Limitarea=0;
	Limitconsult=0;
	Limitcustom=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeTraceOrder(consultorderV);
};

var chkTraceDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getTraceData();
};

var getTraceData=function(){
	var requests={"question":"GetTraceData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"consult":Limitconsult,"custom":Limitcustom,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var consultcolstrace=$(ans).find("answer").attr("colstrace");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="18%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeTraceOrder(\'time\');" class="tooltip" title="������ʱ������" >����<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="������ʱ������" /></a> </th>';
					if(0==consultcols){
						htmlthead+='<th width="20%" colspan="3">���� | ��Ա</th>';
					}
					else if(1==consultcols){
						if(1!=consultcolstrace)htmlthead+='<th width="20%">��Ա</th>';
					}
					htmlthead+='<th width="57%">������Ŀ</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						if(0==consultcols){
							htmltbody+="<td colspan='3'>"+$(this).find("locate").text()+"��"+$(this).find("staff").text()+"��</td>";
						}else if(1==consultcols){
							if(1!=consultcolstrace)htmltbody+='<td>'+$(this).find("staff").text()+"</td>";
						}
						var cusid=$(this).find("cid").text();
						htmltbody+='<td style="text-align:left;text-indent:2em;">'+$(this).find("reputation").text()+'�ͻ���<a id="cus'+cusid+'" href="javascript:void(0);" onclick="TraceDetail('+cusid+');" style="text-decoration:none;">'+($(this).find("customer").text()==""?"δ����":$(this).find("customer").text())+'</a>��'+$(this).find("traces").text().replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("staff").text()+'</span>')+(""!=$(this).find("comment").text()? '>> <span style="color:#999">'+$(this).find("comment").text()+'</span>':'')+'</td>';
						htmltbody+="</tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoTracePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoTracePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoTracePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoTracePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeTracePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayTraceOrder();
			$('.tooltip').toolTip();
		}
	});
};

var TraceDetail=function(i){
	cuid=i;
	GetTraceDetail();
	showForm("#Details","#fade");
};

var GetTraceDetail=function(){
	var requests={"question":"GetTraceDetails","cid":cuid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Details").html(htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">�ͻ�<span style="color:blue">'+$("#cus"+cuid).text()+'</span>��ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span>��';
				var htmldetails="";
				htmldetails+='<hr>';
				htmldetails+='<div>'+stat+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				}
				$(ans).find("trace").each(function(){
					var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
				});
				htmldetails+= '<hr><div><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div>';
				$("#Details").html(htmldetails);
				JudgeWindowSizetoCss("#Details");
			}
		},
		complete:function(){
		}
	});
};

/****************************************************************/
var changeStudentOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetStudentCondition();
	$("#img"+v).show();
};

var displayStudentOrder=function(){
	$("#imgtime").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	$("#imgfee").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeStudentPage=function(){
	gotoStudentPage($("#changeconsultpage").val());
};

var gotoStudentPage=function(p){
	consultpage=p;
	GetStudentCondition();
};

var setStudentLimitDate=function(c){
	consultpage=1;
	LimitStudentdate=c;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var chkStudentDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getStudentData();
};

var StudentSearcher=function(){
	Limitarea=0;
	Limitclass=0;
	LimitStudentdate="all";
	LimitStudentstatus="all";
	LimitStudentFee="all";
	LimitStudentDocs="all";
	LimitStudentEmps="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeStudentOrder(consultorderV);
};

var setLimitClass=function(){
	LimitStudentTips=0;
	Limitclass=$("#class").val();
	consultpage=1;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
	$("#Positonlist").hide();
	$("#DetailPay").hide();
	$("#DetailTeach").hide();
	$("#Weeklylist").hide();
	$("#Employlist").hide();
	$("#OutStudentlist").hide();
	$("#statics").hide();
	$("#inpStudentTrans").hide();
};

var setStudentLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getLocalClass();
	$("#search").val("");
	consultkey="";
};

var setLimitStudentStatus=function(c){
	LimitStudentTips=0;
	consultpage=1;
	LimitStudentstatus=c;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitStudentFee=function(c){
	consultpage=1;
	LimitStudentFee=c;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitStudentDocs=function(c){
	consultpage=1;
	LimitStudentDocs=c;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitStudentEmps=function(c){
	consultpage=1;
	LimitStudentEmps=c;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var setLimitStudentTips=function(c){
	Limitclass=0;
	LimitStudentstatus=0;
	LimitStudentTips=1;
	consultorder=1;
	consultpage=1;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
};

var getLocalClass=function(){
	var requests={"question":"GetClass","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var isClass=0;
				var htmlselClass='<option value="0">ȫ��</option>';
				if(0<$(ans).find("class").size()){
					$(ans).find("class").each(function(){
						if(Limitclass==$(this).attr("id")){
							isClass=1;
							htmlselClass+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}else{
							htmlselClass+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}
					});
				}else{
					htmlselClass='<option value="0">��</option>';
				}
				if(0==isClass){
					Limitclass=0;
					$("#Positonlist").hide();
					$("#DetailPay").hide();
					$("#DetailTeach").hide();
					$("#Weeklylist").hide();
					$("#Employlist").hide();
					$("#OutStudentlist").hide();
					$("#statics").hide();
					$("#inpStudentTrans").hide();
				}
				$("#class").html(htmlselClass);
				html="";
				if(0==$(ans).find("tips").size()&&1==LimitStudentTips){
					LimitStudentTips=0;
					setLimitStudentStatus("all");
				}
				else if(0<$(ans).find("tips").size()){
					html+=htmlhr;
					$(ans).find("tips").each(function(){
						if(1==LimitStudentTips){
							html+='<span style="font-weight:bold;">������</span><a class="active" href="javascript:void(0);" onclick="setLimitStudentTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}else{
							html+='<span style="font-weight:bold;">������</span><a href="javascript:void(0);" onclick="setLimitStudentTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}
					});	
				}
				$("#tips").html(html);
			}
		},
		complete:function(){
			getStudentData();
		}
	});
};

var showSDetailList=function(i){
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	$("#TitleStatics").html("");
	$("#Listtitle").html($("#class").find("option:selected").text()+($("#area").val()>0 ? '��'+$("#area").find("option:selected").text()+'��':""));
	showForm("#CountDetail","#fade2");
	var requests={"question":"ShowSDetailList","class":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmldetailthead='';
			var htmldetailtbody='';
			var htmldetailtfooter='';
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				var sdetailtotal=$(ans).find("answer").attr("all");
				//loadings("h");
				if(0==sdetailtotal){
					htmldetailthead+='<tr>';
					htmldetailthead+='<th width="100%"><span style="color:#FF0000">��ѧԱ��¼</span></th>';
					htmldetailthead+='</tr>';
				}else{
					htmldetailthead+='<tr>';
					htmldetailthead+='<th width="5%">ѧ��</th>';
					htmldetailthead+='<th width="10%">����</th>';
					htmldetailthead+='<th width="4%">�ձ�</th>';
					htmldetailthead+='<th width="11%">֤����</th>';
					htmldetailthead+='<th width="12%">��ѯ���� | ԺУ��չ</th>';
					htmldetailthead+='<th width="7%">�ɿ���ʽ</th>';
					htmldetailthead+='<th width="13%">ҵ������</th>';
					htmldetailthead+='<th width="10%">Ӧ�ɷ���</th>';
					htmldetailthead+='<th width="10%">�ѽɷ���</th>';
					htmldetailthead+='<th width="10%">���ɷ���</th>'
					htmldetailthead+='<th width="10%">��������</th>'
					htmldetailthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var Dcolor;
						var Dover;
						if($(this).find("sfeetopayN").text()>=0){
							Dover='<td>-</td>';
							if($(this).find("sfeetopayN").text()==0){
								Dtopay="<td style='color:green'>"+$(this).find("sfeetopay").text()+"</td>";
							}else{
								Dtopay="<td style='color:red'>"+$(this).find("sfeetopay").text()+"</td>";
							}
						}else{
							Dtopay="<td>-</td>";
							Dover="<td style='color:blue'>"+$(this).find("sfeetopay").text().replace("-","")+"</td>";
						}
						if($(this).find("sfeetopayN").text()==0)Dcolor="green";
						if($(this).find("sfeetopayN").text()>0)Dcolor="red";
						if($(this).find("sfeetopayN").text()< 0)Dcolor="blue";
						if(0==$(this).find("sname").text()){
							htmldetailtbody+="<tr style='line-height:26px;font-size:14px;'>";
							htmldetailtbody+="<td colspan='7' style='font-weight:bold;color:#DF7401;'>�ϼ�</td>";
							htmldetailtbody+="<td style='font-weight:bold;color:#DF7401;'>"+$(this).find("sfeeall").text()+"</td>";
							htmldetailtbody+="<td style='font-weight:bold;color:green;'>"+$(this).find("sfeed").text()+"</td>";
							htmldetailtbody+="<td style='font-weight:bold;color:red;'>"+$(this).find("sfeetopay").text()+"</td>";
							htmldetailtbody+="<td style='font-weight:bold;color:blue;'>"+$(this).find("sfeeover").text()+"</td>";
							htmldetailtbody+="</tr>";
						}else{
							htmldetailtbody+="<tr>";
							htmldetailtbody+="<td>"+$(this).find("snumber").text()+"</td>";
							htmldetailtbody+="<td style='font-weight:bold;'>"+$(this).find("sname").text();
							$(this).find("op0").children().each(function(idx,ele){
								if($(ele)[0].tagName=="SDetail")htmldetailtbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');">'+$(ele).text()+'</a></font>';
							});
							htmldetailtbody+='</td>';
							htmldetailtbody+="<td>"+$(this).find("ssex").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("screditId").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("sconsult").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("sfeeway").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("sbelongto").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("sfeeall").text()+"</td>";
							htmldetailtbody+="<td>"+$(this).find("sfeed").text()+"</td>";
							htmldetailtbody+=Dtopay;
							htmldetailtbody+=Dover;
							htmldetailtbody+="</tr>";
						}
					});
				}
				htmldetailtfooter+="�� "+sdetailtotal+" ����¼";
			}
			$("#detailthead").html(htmldetailthead);
			$("#detailtbody").html(htmldetailtbody);
			$("#detailtfooter").html(htmldetailtfooter);
			if(""!=htmldetailtbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
		}
	});
};

var GetStudentCondition=function(){
	var requests={"question":"GetStudentConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setStudentLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("class").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">�༶��</span><select id="class" onchange=setLimitClass();>';
					if(0==Limitclass){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("class").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("class").each(function(){
							if($(this).attr("id")==Limitclass){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}
						});
					}
					html+="</select></label>";
					if(0<Limitclass){
						if(0<$(ans).find("isPositionlist").attr("value"))html+='<label id="Positonlist" style="margin-left:10px;"><a style="color:#FFF;font-size:13px;background-color:#316de8;border-radius:5px;box-shadow:4px 4px 4px #999;padding:3px 8px;" href="javascript:void(0);" onclick="GetStudentPositionlist('+Limitclass+');">��λͼ</a></label>';
						if(0<$(ans).find("isFeelist").attr("value"))html+='<label id="DetailPay" style="margin-left:10px;"><a style="color:#FFF;font-size:13px;background-color:#B335D0;border-radius:5px;box-shadow:4px 4px 4px #999;padding:3px 8px;" href="javascript:void(0);" onclick="showSDetailList('+Limitclass+');">�ɷ�����</a></label>';
						html+='<label id="DetailTeach" style="margin-left:10px;"><a style="color:#FFF;font-size:13px;background-color:#03B312;border-radius:5px;box-shadow:4px 4px 4px #999;padding:3px 8px;" href="javascript:void(0);" onclick="showTeachDetailList('+Limitclass+');">ѧԱ����<span id="ThisCnums" style="color:#ffefd5;font-size:9pt;"/></a></label>';
						if(0<$(ans).find("isWeeklylist").attr("value"))html+='<label id="Weeklylist" style="margin-left:10px;"><a style="color:#FFF;font-size:13px;background-color:#984225;border-radius:5px;box-shadow:4px 4px 4px #999;padding:3px 8px;" href="javascript:void(0);" onclick="ClassWeeklylist('+Limitclass+');">ѧԱ�ܱ�</a></label>';
						if(0<$(ans).find("isEmploylist").attr("value"))html+='<label id="Employlist" style="margin-left:10px;"><a style="color:#FFF;font-size:13px;background-color:#FF6633;border-radius:5px;box-shadow:4px 4px 4px #999;padding:3px 8px;" href="javascript:void(0);" onclick="ClassEmploylist('+Limitclass+');">��ҵ����</a></label>';
						if(0<$(ans).find("isOutStudentlist").attr("value"))html+='<label id="OutStudentlist" style="margin-left:10px;"><input type="button" value=" �� �� " onclick="OutClassStudentlist('+Limitclass+');" /></label>';
						isQueue=$(ans).find("isQueuelist").attr("value");
					}else isQueue=0;
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("class").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("status").size()){
					if('all'==LimitStudentstatus){
						html+='<span style="font-weight:bold;">״̬��</span><a class="active" href="javascript:void(0);" onclick=setLimitStudentStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">״̬��</span><a href="javascript:void(0);" onclick=setLimitStudentStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							if($(this).attr("id")==LimitStudentstatus){
								html+='<a class="active" id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
					html+=htmlhr;
				}
				$("#status").html(html);
				html="";
				if(0<$(ans).find("emps").size()){
					if('all'==LimitStudentEmps){
						html+='<span style="font-weight:bold;">��ҵ��</span><a class="active" href="javascript:void(0);" onclick=setLimitStudentEmps(\'all\');>ȫ��</a>';
						$(ans).find("emps").each(function(){
							html+='<a id="emps'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentEmps(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">��ҵ��</span><a href="javascript:void(0);" onclick=setLimitStudentEmps(\'all\');>ȫ��</a>';
						$(ans).find("emps").each(function(){
							if($(this).attr("id")==LimitStudentEmps){
								html+='<a class="active" id="emps'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentEmps(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="emps'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentEmps(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
					html+=htmlhr;
				}
				$("#emps").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==LimitStudentdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setStudentLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setStudentLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
				
				html="";
				if(0<$(ans).find("fee").size()){
					html+=htmlhr;
					if('all'==LimitStudentFee){
						html+='<span style="font-weight:bold;">���</span><a class="active" href="javascript:void(0);" onclick=setLimitStudentFee(\'all\');>ȫ��</a>';
						$(ans).find("fee").each(function(){
							html+='<a id="fee'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentFee(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">���</span><a href="javascript:void(0);" onclick=setLimitStudentFee(\'all\');>ȫ��</a>';
						$(ans).find("fee").each(function(){
							if($(this).attr("id")==LimitStudentFee){
								html+='<a class="active" id="fee'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentFee(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="fee'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentFee(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
				}
				$("#fee").html(html);
				
				html="";
				if(0<$(ans).find("docs").size()){
					html+=htmlhr;
					if('all'==LimitStudentDocs){
						html+='<span style="font-weight:bold;">���ϣ�</span><a class="active" href="javascript:void(0);" onclick=setLimitStudentDocs(\'all\');>ȫ��</a>';
						$(ans).find("docs").each(function(){
							html+='<a id="docs'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentDocs(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">���ϣ�</span><a href="javascript:void(0);" onclick=setLimitStudentDocs(\'all\');>ȫ��</a>';
						$(ans).find("docs").each(function(){
							if($(this).attr("id")==LimitStudentDocs){
								html+='<a class="active" id="docs'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentDocs(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="docs'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStudentDocs(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
				}
				html+='<span style="margin:0 25px 0 15px;color:#AAA;">|</span><a style="background:none;" href="javascript:void(0);" onclick="thisStudentReload();"><img src="img/reload.gif" style="margin:0 0 -3px 0px;" class="tooltip" title="ˢ�µ�ǰ����"/></a>';
				if(0<Limitclass)html+='<span style="margin:0 25px 0 15px;color:#AAA;">|</span><input id="inpStudentTrans" style="margin-left:2px;" type="button" onclick="inpStudentTrans();" value=" �༶ѧԱ�䶯���� " />';
				$("#docs").html(html);
				html="";
				if(0==$(ans).find("tips").size()&&1==LimitStudentTips){
					LimitStudentTips=0;
				}
				else if(0<$(ans).find("tips").size()){
					html+=htmlhr;
					$(ans).find("tips").each(function(){
						if(1==LimitStudentTips){
							html+='<span style="font-weight:bold;">������</span><a class="active" href="javascript:void(0);" onclick="setLimitStudentTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}else{
							html+='<span style="font-weight:bold;">������</span><a href="javascript:void(0);" onclick="setLimitStudentTips();">'+$(this).attr("name").replace("%NUMBER%",$(this).attr("id"))+'</a>';
						}
					});	
				}
				$("#tips").html(html);
			}
		},
		complete:function(){
			getLocalClass();
		}
	});
};

var inpStudentTrans=function(){
	showForm("#Operate2","#fade");
	var requests={"question":"GetStudentTrans","cid":Limitclass};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate2").html('<div style="float:left;">'+htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Operate2\');" type="button" value="�ر�" /></div>');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				htmltransdetails="";
				htmltransdetails+='<div style="float:right;"><input name="cancel" onclick="CloseW(\'Operate2\');" type="button" value="�ر�" /></div><hr>';
				if(0==$(ans).find("transout").size()){
					htmltransdetails+='<li style="text-align:left;font-weight:bold;color:#BBB;font-size:13px;">�ð༶��ʱû��ת��ѧԱ��¼��</li>';
				}else{
					htmltransdetails+='<li style="text-align:left;font-weight:bold;font-color:#333;font-size:13px;">ѧԱת����¼��</li>';
					$(ans).find("transout").each(function(){
						htmltransdetails+='<li style="text-align:left;padding-left:5px;"><span style="color:#00b6cf;font-weight:bold;">'+$(this).attr("sname")+'</span></li>';
						$(this).find("trace").each(function(){
							var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
							htmltransdetails+='<li style="text-align:left;padding-left:15px;">'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
						});
					});
				}
				htmltransdetails+='<hr style="border:1px dashed #ccc;">';
				if(0==$(ans).find("transin").size()){
					htmltransdetails+='<li style="text-align:left;font-weight:bold;color:#BBB;font-size:13px;">�ð༶��ʱû��ת��ѧԱ��¼��</li>';
				}else{
					htmltransdetails+='<li style="text-align:left;font-weight:bold;font-color:#333;font-size:13px;">ѧԱת����¼��</li>';
					$(ans).find("transin").each(function(){
						htmltransdetails+='<li style="text-align:left;padding-left:5px;"><span style="color:#00b6cf;font-weight:bold;">'+$(this).attr("sname")+'</span></li>';
						$(this).find("trace").each(function(){
							var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
							htmltransdetails+='<li style="text-align:left;padding-left:15px;">'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
						});
					});
				}
				htmltransdetails+='<div style="float:right;"><input name="cancel" onclick="CloseW(\'Operate2\');" type="button" value="�ر�" /></div><hr>';
				$("#Operate2").html(htmltransdetails);
				JudgeWindowSizetoCss("#Operate2");
			}
		},
		complete:function(){
		}
	});
};

var ClassEmploylist=function(i){
	$("#detailthead").html("");
	$("#detailtbody").html("");
	$("#detailtfooter").html("");
	$("#TitleStatics").html("");
	$("#Listtitle").html($("#class").find("option:selected").text()+($("#area").val()>0 ? '��'+$("#area").find("option:selected").text()+'��':""));
	showForm("#CountDetail","#fade2");
	var requests={"question":"ShowSEmployList","class":i};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmldetailthead='';
			var htmldetailtbody='';
			var htmldetailtfooter='';
			var htmldetailtitle='';
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				htmldetailtitle+='<p style="font-size:15px;padding:5px;font-weight:bold;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:10px;">�ڰ�������'+$(ans).find("answer").attr("all")+'��<br/>ͨ��ģ�����ԡ�'+$(ans).find("answer").attr("interv")+'�� ģ������δͨ����'+$(ans).find("answer").attr("nomock")+'��<br/>��������ҵ��'+$(ans).find("answer").attr("giveup")+'�� �Ѿ�ҵ��'+$(ans).find("answer").attr("employ")+'��</p>';
				htmldetailtitle+='<p style="margin:5px 0 5px 0;font-size:15px;padding:5px;font-weight:bold;padding:3px 10px 3px 10px;color:#FFF;background-color:#666;border-radius:10px;">ģ������ͨ���ʣ�'+$(ans).find("answer").attr("mrate")+'����ҵ�ʣ�'+$(ans).find("answer").attr("erate")+'��ƽ��н�ʣ�'+$(ans).find("answer").attr("srate")+'��</p><div style="float:left;"><input name="cancel" onclick="CloseWStulist(\'CountDetail\');" type="button" value="�ر�" /></div>';
				$("#Operateloading").html("");
				var sdetailtotal=$(ans).find("answer").attr("all");
				if(0==sdetailtotal){
					$("#TitleStatics").hide();
					htmldetailthead+='<tr>';
					htmldetailthead+='<th width="100%"><span style="color:#FF0000">��ѧԱ��¼</span></th>';
					htmldetailthead+='</tr>';
				}else{
					$("#TitleStatics").show();
					htmldetailthead+='<tr>';
					htmldetailthead+='<th width="5%">ѧ��</th>';
					htmldetailthead+='<th width="15%" style="text-align:left;padding-left:15px;">����</th>';
					htmldetailthead+='<th width="15%" style="text-align:left;padding-left:15px;">״̬</th>';
					htmldetailthead+='<th width="8%">��ҵ�γɼ�</th>';
					htmldetailthead+='<th width="8%">��ְ����</th>';
					htmldetailthead+='<th width="10%">��ְ����</th>';
					htmldetailthead+='<th width="13%">ְλ</th>';
					htmldetailthead+='<th width="8%">н��</th>';
					htmldetailthead+='<th width="8%">����н��</th>';
					htmldetailthead+='<th width="8%">��ע</th>'
					htmldetailthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("statN").text();
						var Strstat=""
						if(1000==$(this).find("Noemp").text()&&1600==sid)Strstat='<span style="color:#999;font-size:8pt;">������������ҵ��</span>';
						if(100==$(this).find("Nointerv").text()&&1300==sid)Strstat='<span style="color:#999;font-size:8pt;">��δͨ�����ԣ�</span>';
						if(200==$(this).find("Nointerv").text()&&1300==sid)Strstat='<span style="color:#999;font-size:8pt;">����ͨ�����ԣ�</span>';
						if(1000==$(this).find("Noemp").text()&&1300==sid)Strstat+='<span style="color:#999;font-size:8pt;">����������ҵ��</span>';
						if(sid==1000)scolor="Green";if(sid==1100)scolor="#CCC";if(sid==1101)scolor="#999";if(sid==1200)scolor="#610B0B";if(sid==1300)scolor="#DF7401";if(sid==1400)scolor="#086A87";if(sid==1500)scolor="#2E9AFE";if(sid==1600)scolor="#6E6E6E";
						htmldetailtbody+="<tr>";
						htmldetailtbody+="<td>"+$(this).find("snumber").text()+"</td>";
						htmldetailtbody+="<td style='font-weight:bold;text-align:left;'>"+$(this).find("sname").text()+"</span>"+($(this).find("sname").text().length==2?"��":"")+"("+$(this).find("ssex").text()+")";
						$(this).find("op0").children().each(function(idx,ele){
							if($(ele)[0].tagName=="SDetail")htmldetailtbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');">'+$(ele).text()+'</a></font>';
						});
						htmldetailtbody+='</td>';
						htmldetailtbody+="<td style='text-align:left;'><span style='color:"+scolor+"'>"+$(this).find("stat").text()+"</span>"+Strstat+"</td>";
						htmldetailtbody+="<td>"+$(this).find("credit").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("empdate").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("emparea").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("emppos").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("empsalary").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("empprobat").text()+"</td>";
						htmldetailtbody+="<td>"+$(this).find("comment").text()+"</td>";
						htmldetailtbody+="</tr>";
					});
				}
				htmldetailtfooter+="�� "+sdetailtotal+" ����¼";
			}
			$("#TitleStatics").html(htmldetailtitle);
			$("#detailthead").html(htmldetailthead);
			$("#detailtbody").html(htmldetailtbody);
			$("#detailtfooter").html(htmldetailtfooter);
			if(""!=htmldetailtbody){
				senfe("detailtbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
		}
	});
};

var ClassWeeklylist=function(i){
	showForm("#Operate3","#fade");
	var requests={"question":"GetClassWeeklylist","cid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate3").html(htmlimgo+' <input type="button" onclick="CloseW(\'Operate3\');" value="�ر�" />');
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
				$("#Operate3").html("");
			}
			if(1==err){
				var htmlreslist='<hr style="border:1px dashed #ccc;">';
				$("#Operate3").html("");
				if(0==$(ans).find("data").size())htmlreslist+='<span style="color:#666;padding-left:3px;">�ð༶û���ܱ���¼��</span>';
				else{
					$(ans).find("data").each(function(){
						htmlreslist+='<li style="line-height:18px;"><span style="color:#61380B;font-size:13px;">�� '+$(this).find("gctype").text()+'</span>��'+$(this).find("gcourse").text()+'��'+$(this).find("gDate").text()+'�����ܱ� <span style="color:#666;font-weight:normal;font-size:12px;">'+$(this).find("gtime").text()+'</span> <a style="color:blue;text-decoration:none;" href="javascript:void(0);" onclick="ShowClassWeekly('+$(this).attr("id")+');">[�鿴]</a></li>';
					});
				}htmlreslist+='<hr style="border:1px dashed #ccc;"><input type="button" onclick="CloseW(\'Operate3\');" value="�ر�" />';
				$("#Operate3").html(htmlreslist);
			}
		},
		complete:function(){
		}
	});
};

var ShowClassWeekly=function(i){
	showForm("#Operate4","Null");
	var requests={"question":"ShowClassWeekly","gid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operate4").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin1(\'Operate4\');">�ر�</a>]');
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
				hideForm("#Operate4","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1==err){
				var gtype=$(ans).find("answer").attr("gtype");
				var htmldata='[<a style="color:blue;" href="javascript:void(0);" onclick=CloseWin1(\'Operate4\');>�ر�</a>]<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;background-color:#FFF;">';
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
				htmldata+='<br><div style="text-align:center;"><input name="cancel" onclick="CloseWin1(\'Operate4\');" type="button" value=" �ر� " /></div>';
				$("#Operate4").html(htmldata);
			}
		},
		complete:function(){
		}
	});
};

var thisStudentReload=function(){
	topMain();
	GetTab();
	GetStudentCondition();
	checkmsg();
};

var getStudentData=function(){
	var requests={"question":"getStudentData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"class":Limitclass,"status":LimitStudentstatus,"fee":LimitStudentFee,"docs":LimitStudentDocs,"emps":LimitStudentEmps,"date":LimitStudentdate,"d0":$("#date0").val(),"d1":$("#date1").val(),"tips":LimitStudentTips};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var feecols=$(ans).find("answer").attr("fees");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="10%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeStudentOrder(\'time\');" class="tooltip" title="����ѧʱ������" >����<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ѧʱ������" /></a> </th>';
					htmlthead+='<th width="39%" style="text-align:left;padding-left:6px;">���� | ѧ��</th>';
					if(0==consultcols){
						htmlthead+='<th width="23%" style="text-align:left;"><a href="javascript:void(0);" onclick="changeStudentOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a> | �༶ | ��ѯ����</th>';
					}
					if(1==consultcols){
						htmlthead+='<th width="18%" style="text-align:left;">�༶ | ��ѯ����</th>';
					}
					if(0<feecols)htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeStudentOrder(\'fee\');" class="tooltip" title="���ɷ���������" >��������<img id="imgfee" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���ɷ���������" /></a></th>';
					htmlthead+='<th width="17%" style="text-align:left;padding-left:20px;"><a href="javascript:void(0);" onclick="changeStudentOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a> | ����</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						var fee=$(this).find("fee").text();
						var feen='<span style="color:#cccccc">'+$(this).find("fee").text()+'</span>';
						var isred=$(this).find("Sorder").text();
						var ismail=$(this).find("eflag").text();
						if(sid==1101){
							if(0==$(this).find("fee").text())feen='<span style="color:#999">���ֿ���</span>';
							if(1==$(this).find("fee").text())feen='<span style="color:#999">֧��ȫ��</span>';
						}else{
							if(0==$(this).find("fee").text())feen=$(this).find("payfeeflag").text()>0?'<span style="color:red" class="tooltip" title="Ƿ��'+$(this).find("payfeen").text()+'">��Ƿ��</span>':'<span style="color:red">Ƿ</span>'+$(this).find("payfeen").text();
							if(1==$(this).find("fee").text()){
								if(0>$(this).find("payfee").text())feen=$(this).find("payfeeflag").text()>0?'<span style="color:#6959CD" class="tooltip" title="����'+$(this).find("payfeen").text().replace("-","")+'">����</span>':'<span style="color:#6959CD">��</span>'+$(this).find("payfeen").text().replace("-","");
								else feen='<span style="color:green">�ѽ���</span>';
							}
						}
						var ddevice="";
						if($(this).find("devflag").text()==1){
							ddevice=' <input id="device'+dataid+'" style="display:none;border:1px #CCC solid;" value="" size="10" onblur="toStudentOperate(\'Sdevice\');">'+($(this).find("device").text()==""?"":'<span style="color:#E38A42;" class="tooltip" title="�豸���ţ�'+$(this).find("device").text()+'">��</span>'); //<span id="dcode'+dataid+'" style="color:#999;font-size:9pt;text-decoration:underline;">����:'+$(this).find("device").text()+'</span>
						}else{
							ddevice=$(this).find("device").text()==""?"":' <span style="color:#E38A42;" class="tooltip" title="�豸���ţ�'+$(this).find("device").text()+'">��</span>';
						}
						var dflag='<a style="color:#666;font-size:20px;text-decoration:none;" class="tooltip" title="�����貹��" href="javascript:void(0);" onclick="SDocument('+dataid+');">��</a>'; 
						if(1==$(this).find("dflag").text())dflag='<a style="color:#3CB371;font-size:20px;text-decoration:none;" class="tooltip" title="������ȫ" href="javascript:void(0);" onclick="SDocument('+dataid+');">��</a>';
						var eflag='<span style="color:#ff0000;font-size:11px;text-decoration:none;" class="tooltip" title="δ���Ϳ����ʼ�">@</span>'; 
						if(1==ismail)eflag='<span style="color:#6CC417;font-size:11px;text-decoration:none;" class="tooltip" title="�ѷ��Ϳ����ʼ�">@</span>';
						if(sid==1000)scolor="Green";if(sid==1100)scolor="#CCC";if(sid==1101)scolor="#999";if(sid==1200)scolor="#610B0B";if(sid==1300)scolor="#DF7401";if(sid==1400)scolor="#086A87";if(sid==1500)scolor="#2E9AFE";if(sid==1600)scolor="#6E6E6E";
						var tr="";
						if(isred==0)tr='<tr>';
						if(isred==1)tr='<tr class="flag">';
						htmltbody+=tr;
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+='<td style="text-align:left;">'+dflag+'<span id="studentName'+dataid+'" style="font-weight: bold;">'+$(this).find("name").text()+($(this).find("name").text().length==2?"��":"")+($(this).find("num").text()==""?'':'<span style="color:#999;font-size:8pt;">��'+$(this).find("num").text()+'��</span>')+eflag+'</span>';
						htmltbody+='<br/>';
						$(this).find("op0").children().each(function(idx,ele){
							if($(ele)[0].tagName=="AddRule")htmltbody+= '<font class="op"> <a style="color:#fff;text-decoration:none;background-color:#666;" href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
							if($(ele)[0].tagName=="SendtoEmail"&&0==ismail)htmltbody+= '<font class="op"> <a style="color:#fff;text-decoration:none;background-color:#4863A0;" href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
							else htmltbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
						});
						htmltbody+=ddevice;
						var dstars='';
						for(var k=0;k < $(this).find("stars").text();k++){
							dstars+=' <span class="tooltip" style="color:#99CCFF;" title="������('+(k+1)+')�ν׶��ܽ�">��</span>';
						};
						htmltbody+='<br/>'+dstars;
						if(0<$(this).find("mockstar").text())htmltbody+=' <span class="tooltip" style="color:'+(sid==1600?'#FF9900':'#ff0000')+';" title="ģ������δͨ��">��</span>';
						htmltbody+="</td>";
						if(0==consultcols){
							htmltbody+="<td style='text-align:left;'>"+$(this).find("locate").text()+($(this).find("class").text()==''?"":"��"+$(this).find("class").text()+"��")+"<span style='color:#AAA;font-size:10px;'>"+$(this).find("consult").text()+"</span>";
						}
						if(1==consultcols){
							htmltbody+="<td style='text-align:left;'>"+($(this).find("class").text()==''?"":" "+$(this).find("class").text())+$(this).find("consult").text();
						}
						htmltbody+='<br/>';
						$(this).find("op1").children().each(function(idx,ele){
							htmltbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
						});
						htmltbody+="</td>";
						if(0<feecols)htmltbody+='<td>'+feen+'</td>';
						var shtmltbody='<span style="color:'+scolor+'">��'+$(this).find("stat").text()+'��</span>'+(1000==$(this).find("Noemp").text()&&1600==sid?'<span style="color:#999;font-size:8pt;">����������ҵ</span>':(1000==$(this).find("Noemp").text()&&1300==sid?'<span style="color:#999;font-size:8pt;">��������ҵ</span>':""));
						if(0<isred){
							htmltbody+='</td><td style="text-align:left;"><span style="color:red;">������</span>'+shtmltbody;
						}else{
							htmltbody+= '<td style="text-align:left;">'+shtmltbody;
						}
						$(this).find("op2").children().each(function(idx,ele){
							htmltbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
						});
						htmltbody+="</td></tr>";
					});
				}
				if(0<Limitclass){
					var htmlInfo='<span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">�γ̽��� >>></span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("process")==""?"δ����":$(ans).find("classinfo").attr("process"))+'</p><span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#999;border-radius:4px;">����ͳ�ƣ�</span><p style="margin-bottom:0px;" id="NumInclass"></p><p style="margin-bottom:6px;" id="NumDropclass"></p><span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#999;border-radius:4px;">�ڿν��ң�</span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("classtype")==""?"δ��":$(ans).find("classinfo").attr("classtype"))+'</p><span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#999;border-radius:4px;">ְҵ�滮��</span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("advicer")==""?"����":$(ans).find("classinfo").attr("advicer"))+'</p><span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#999;border-radius:4px;">�γ̽�ʦ��</span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("teacher")==""?"δ����":$(ans).find("classinfo").attr("teacher"))+'</p><span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#999;border-radius:4px;">ѧ �ڣ�</span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("copen")=="0000-00-00"?"δ����":$(ans).find("classinfo").attr("copen"))+'����<br/>'+($(ans).find("classinfo").attr("cclose")=="0000-00-00"?"δ����":$(ans).find("classinfo").attr("cclose"))+'��ҵ</p>';//<span style="font-weight:bold;padding:2px 6px 2px 6px;color:#FFF;background-color:#3B9C9C;border-radius:4px;">��ҵָ����</span><p style="margin-bottom:6px;">'+($(ans).find("classinfo").attr("guidance")==""?"δ����":$(ans).find("classinfo").attr("guidance"))+'</p>
					$("#statics").html(htmlInfo);
					$("#statics").show();
				}
				if(0<$(ans).find("avgs").size()){
					var htmlavgs='<ul><span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">ƽ���ɼ� >>></span>';
					$(ans).find("avgs").each(function(){
						htmlavgs+='<li style="padding:3px 6px;">'+$(this).attr("exname")+'<br/><u>��'+$(this).attr("excredit")+'��</u></li>';
					});htmlavgs+='</ul>';
					$("#statics").append(htmlavgs);
				}
				if(0<$(ans).find("employ").size()){
					var htmlemploy='<ul style="margin:6px 6px;"><span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">��ҵ���� >>></span>';
					htmlemploy+='<li style="padding-top:3px;">��������'+$(ans).find("employ").attr("Ngiveup")+'����</li>';
					htmlemploy+='<li>����ͨ����'+$(ans).find("employ").attr("Ninterview")+'����</li>';
					htmlemploy+='<li>δͨ����'+$(ans).find("employ").attr("NoMock")+'����</li>';
					htmlemploy+='<li style="color:#00b6cf;font-weight:bold;">�Ѿ�ҵ��'+$(ans).find("employ").attr("Nemploy")+'����</li>';
					$("#statics").append(htmlemploy);
				}
				if(0<isQueue){
					var htmlqueue="<hr>";
					if(0==$(ans).find("queue").size())htmlqueue+='�ð��޴�����ѧԱ��';
					else{
						htmlqueue+='<span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">�������� >>></span>';
						htmlqueue+='<ul style="text-align:center;">';
						$(ans).find("queue").each(function(){
							htmlqueue+='<li>'+$(this).attr("qid")+'.'+$(this).attr("sname")+(0<$(this).attr("uid")?"(<span style='color:red;font-size:11px;'>��ѧ</span>)":"")+'<span style="color:#CCC;">��'+$(this).attr("cname")+'��</span><a title="ȡ��ռλ�Ŷ�" style="text-decoration:none;color:#00b6cf;" href="javascript:void(0);" onclick="if(confirm(\'�Ƿ�ȷ��Ҫȡ��ѧԱ�ð༶�Ŷӣ�\')) CancelQueue('+$(this).attr("sid")+','+$(this).attr("cid")+');">[x]</a></li>';
						});htmlqueue+='</ul>';
					}htmlqueue+='<hr>';
					$("#statics").append(htmlqueue);
				}
				if(0<$(ans).find("selfclass").size()){
					var htmlselfclass='<ul><span style="font-weight:bold;padding:3px 12px 3px 12px;color:#FFF;background-color:#319fcc;border-radius:4px;">�ҵİ༶</span>';
					$(ans).find("selfclass").each(function(){
						htmlselfclass+='<li><a '+($(this).attr("cid")==Limitclass?"class='myclasses'":"")+' href="javascript:void(0);" onclick=jumpSelfClass('+$(this).attr("cid")+');>'+$(this).attr("cname")+'</a></li>';
					});htmlselfclass+='</ul>';
					$("#myclasses").html(htmlselfclass);
					$("#myclasses").show();
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStudentPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStudentPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStudentPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStudentPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeStudentPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfei("consulttbody","#FFF","#eee","#ddd","#F5D0A9","#FFEEDD","#FFE5CA","#FDD3AE","#F5D0A9","#DDE1FF","#C9CEFF","#C1C7FF","#D1D5FF");
			}
			$("#ThisCnums").html($(ans).find("answer").attr("Classnums")==""?"":"��"+$(ans).find("answer").attr("Classnums")+"�ˡ�");
			$("#NumInclass").html("�ڰ�"+($(ans).find("answer").attr("Classnums")==''?'����':'��<a href="javascript:void(0);" style="color:#00b6cf;" onclick="showTeachDetailList('+Limitclass+');">'+$(ans).find("answer").attr("Classnums")+'��</a>��'));
			$("#NumDropclass").html("��ѧ"+($(ans).find("answer").attr("ClassDrop")==''?'����':'��<a href="javascript:void(0);" style="color:#00b6cf;" onclick="showDropDetailList('+Limitclass+');">'+$(ans).find("answer").attr("ClassDrop")+'��</a>��'));
		},
		complete:function(){
			displayStudentOrder();
			$('.tooltip').toolTip();
		}
	});
};

var showDropDetailList=function(){
	showForm("#Drop","#fade2");
	$("#Drop").html('���ڼ���...'+htmlimgo+' <input type="button" onclick="CloseW_S(\'Drop\');" value="�ر�" />');
	GetClassDroplist();
};

var GetClassDroplist=function(){
	var requests={"question":"GetClassDroplist","cid":Limitclass,'orderV':consultlistorderV,'order':consultlistorder};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#ClassDropLoading").html(htmlimgo);
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
				$("#ClassDropLoading").html("");
				var consultlisttotal=$(ans).find("answer").attr("all");
				var Droprate=$(ans).find("answer").attr("rate");
				var htmlreslist='<hr style="border:1px dashed #ccc;">';
				var Dropdetailthead=Dropdetailtbody=Dropdetailtfooter='';
				$("#Drop").html('');
				htmlreslist+='<div style="text-align:left;">�༶��ѧ�ʣ�<span id="ListDrop" style="font-weight:bold;color:#000">'+Droprate+'%</span></div><hr style="border:1px dashed #e6e6e6;">';
				htmlreslist+='<table width="100%" border="0" cellpadding="0" cellspacing="0">';
				htmlreslist+='<thead id="Dropdetailthead" class="thead" style="text-align:center;">';
				htmlreslist+='<tr>';
				htmlreslist+='<th width="20%"><a href="javascript:void(0);" onclick="changeClassDroplistOrder(\'time\');" class="tooltip" title="��ʱ������" >��ѧʱ��<img id="imglisttime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
				htmlreslist+='<th width="10%">����</th>';
				htmlreslist+='<th width="15%">��ѯ����</th>';
				htmlreslist+='<th width="10%"><a href="javascript:void(0);" onclick="changeClassDroplistOrder(\'category\');" class="tooltip" class="tooltip" title="��״̬����" >״̬<img id="imglistcategory" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����" /></a></th>';
				htmlreslist+='<th width="45%">����</th>';
				htmlreslist+='</tr>';
				htmlreslist+='</thead>';
				htmlreslist+='<tbody id="Dropdetailtbody" class="tbody" style="text-align:center;">';
				$(ans).find("data").each(function(){
					htmlreslist+='<tr>';
					htmlreslist+='<td>'+$(this).find("dtime").text()+'</td>';
					htmlreslist+='<td style="font-weight:bold;">'+$(this).find("dname").text()+' <font class="op"> <a href="javascript:void(0);" onclick="SDetail('+$(this).attr("id")+');">����</a></font></td>';
					htmlreslist+='<td>'+$(this).find("dconsult").text()+'</td>';
					htmlreslist+='<td>'+$(this).find("dstat").text()+'</td>';
					htmlreslist+='<td>'+$(this).find("dcomm").text()+'</td>';
					htmlreslist+='</tr>';
				});
				htmlreslist+='</tbody></table>';
				htmlreslist+='<div id="Dropdetailtfooter" class="showpage">';
				htmlreslist+="�� "+consultlisttotal+" ����¼";
				htmlreslist+='</div>';
				htmlreslist+='<input name="cancel" onclick="CloseW_S(\'Drop\');" type="button" value="�ر�" /> <span id="ClassDropLoading" />';
				$("#Drop").html(htmlreslist);
				senfe("Dropdetailtbody","#FFF","#eee","#ddd","#F5D0A9","#F3E2A9","#F3F781","#F6CEF5","#A9E2F3");
			}
		},
		complete:function(){
			displayClassDroplistOrder();
		}
	});
};

var changeClassDroplistOrder=function(v){
	$("#imglisttime").hide();
	$("#imglistcategory").hide();
	consultlistpage=1;
	consultlistorderV=v;
	if(htmlimgAsc==$("#imglist"+v).attr("src")){
		consultlistorder=1;
		$("#imglist"+v).attr("src",htmlimgDesc);
	}else{
		consultlistorder=2;
		$("#imglist"+v).attr("src",htmlimgAsc);
	}
	GetClassDroplist();
	$("#imglist"+v).show();
};

var displayClassDroplistOrder=function(){
	$("#imglisttime").hide();
	$("#imglistcategory").hide();
	if(1==consultlistorder)$("#imglist"+consultlistorderV).attr("src",htmlimgDesc);
	if(2==consultlistorder)$("#imglist"+consultlistorderV).attr("src",htmlimgAsc);
	$("#imglist"+consultlistorderV).show();
};

var jumpSelfClass=function(c){
	LimitStudentTips=0;
	Limitarea=0;
	Limitclass=c;
	consultpage=1;
	GetStudentCondition();
	$("#search").val("");
	consultkey="";
	$("#Positonlist").hide();
	$("#DetailPay").hide();
	$("#DetailTeach").hide();
	$("#Weeklylist").hide();
	$("#Employlist").hide();
	$("#OutStudentlist").hide();
	$("#statics").hide();
};

var GetTransClassSels=function(c){
	var requests={"question":"GetTransClassSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#String").attr("value",$(ans).find("answer").attr("semail"));
				var htmlclasssel ="";
				htmlclasssel+='<li><label><input type="radio" value="-1" name="Operatesel"> <span style="font-weight:bold;font-size:13px;">δȷ���༶</span><span></span></label></li><hr style="border:1px dashed #ccc;">';
				$(ans).find("option").each(function(){
					var isopenclass=(1==$(this).attr("isopen"))?'���ѿ��Σ�':'';
					var shownlimit="&nbsp;&nbsp;";
					if($(this).attr("slimit")!=""){
						if(parseInt($(this).attr("snum"))==0)shownlimit='<span style="color:green">���ա�</span>';
						else if(parseInt($(this).attr("snum"))==parseInt($(this).attr("slimit")))shownlimit='<span style="color:#FF9900">������Ա��</span>';
						if(parseInt($(this).attr("snum"))< parseInt($(this).attr("slimit")))shownlimit='<span style="color:blue"> δ����'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
						if(parseInt($(this).attr("snum"))> parseInt($(this).attr("slimit")))shownlimit='<span style="color:red"> ��Ա��'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
					}
					htmlclasssel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> <span style="font-weight:bold;font-size:13px;">'+$(this).attr("name")+'</span><span>('+$(this).attr("area")+')</span>'+shownlimit+'<span style="size:11px;color:#999">�������ڣ�'+$(this).attr("open")+isopenclass+'</span></label></li>';
				});
				$("#Operatesel").html(htmlclasssel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var GetQueueClassSels=function(c){
	var requests={"question":"GetQueueClassSels","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlclasssel ="";
				$(ans).find("option").each(function(){
					var isopenclass=(1==$(this).attr("isopen"))?'���ѿ��Σ�':'';
					var queue=0<$(this).attr("selected")?"<span style='color:red;'>�����Ŷ�"+$(this).attr("queue")+"�ţ�</span> <a title='ȡ��ռλ�Ŷ�' style='text-decoration:none;color:blue;' href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫȡ��ѧԱ�ð༶�Ŷӣ�\")) CancelQueue("+c+","+$(this).attr('id')+");'>[ x ]</a> ":"";
					htmlclasssel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"'+(1==$(this).attr("selected")?" disabled":"")+'> <span style="font-weight:bold;font-size:13px;">'+$(this).attr("name")+'</span>'+queue+'<span>('+$(this).attr("area")+')</span> <span style="size:11px;color:#999">�������ڣ�'+$(this).attr("open")+isopenclass+'</span></label></li>';
				});$("#Operatesel").html(htmlclasssel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var CancelQueue=function(s,c){
	var comm=$("#OperateComment").attr("value");
	var requests={"question":"CancelQueue","sid":s,"class":c,"comm":comm};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#Operateloading").html("");
				if(!$("#Operate").is(":hidden")){
					$("#OperateComment").attr("value","");
					GetQueueClassSels(s);
				}else thisStudentReload();
			}
		},
		complete:function(){
		}
	});
};

var toStudentOperate=function(t){
	var as=$("#OperateCommentA").attr("value");
	var ab=$("#OperateCommentB").attr("value");
	var c=$("#OperateComment").attr("value");
	var d=$('input[name=Operatesel]:checked').val();
	var f=$("#Fee").attr("value");
	var o=$("#Soption").val();
	var b=$("#OperateCheck").attr("checked")?1:0;
	var e=$("#Dodate").attr("value");
	var s=$("#String").attr("value");
	var w=$("#Dodate2").attr("value");
	var l="";
	var inpd=($("#device"+suid).val());
	$($(".checklists")).each(function(){ 
		if($(this).attr("checked"))l+="["+$(this).attr("value")+"]";
	});
	var requests={"question":"StudentOperation","type":t,"suid":suid,"comment":c,"did":d,"f":f,"o":o,"b":b,"e":e,"s":s,"l":l,"w":w,"inpd":inpd,"as":as,"ab":ab};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#OperateloadingA").html(htmlimgo);
			if(t!='Ssuggest')$("#submitoperate").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				alert("��ѧԱ״̬�Ѹı䣬����ʵ��");
				$("#submitoperate").attr("disabled",false);
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetStudentCondition();
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#OperateloadingA").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(2002==err){
				alert($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
				hideForm("#Operate","#fade");
			}
			if(2003==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				GetStudentCondition();
				alert($(ans).find("answer").attr("note"));
			}
			if(2005==err){
				alert($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
				$("#Operateloading").html("");
			}
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Operate","#fade");
				hideForm("#Operate2","#Weekly");
				topMain();
				GetStudentCondition();
				if(""!=$(ans).find("answer").attr("note"))alert($(ans).find("answer").attr("note"));
				if(t=='Ssuggest'&&(!$("#teachlist").is(":hidden")))$("#appendsuggess"+suid).html($("#appendsuggess"+suid).text()+'<span style="color:#110099;">��</span>');
			}
		},
		complete:function(){
		}
	});
};

var Transfer=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>�����°༶��<hr><div id="Operatesel"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><span style="font-weight:bold;font-size:13px;">>>> ����֪ͨ��Email��<input id="String" size=25 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" disabled/></span></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">����ԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Transfer\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetTransClassSels(i);
	showForm("#Operate","#fade");
};

var ToRecover=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span id="RecoverName" style="font-weight:bold;font-size:14px;"></span>��ѧ�����°༶��<hr><div id="Operatesel"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><span style="font-weight:bold;font-size:13px;">>>> ����֪ͨ��Email��<input id="String" size=25 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" disabled/></span></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ѧԭ����<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'ToRecover\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetRecoverClassSels(i);
	showForm("#Operate","#fade");
};

var GotoClass=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span id="RecoverName" style="font-weight:bold;font-size:14px;"></span>�����°༶��<hr><div id="Operatesel"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><span style="font-weight:bold;font-size:13px;">>>> ����֪ͨ��Email��<input id="String" size=25 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" disabled/></span></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'GotoClass\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetRecoverClassSels(i);
	showForm("#Operate","#fade");
};

var GetRecoverClassSels=function(c){
	var requests={"question":"GetRecoverClassSel","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				$("#RecoverName").html($(ans).find("answer").attr("Rname"));
				$("#String").attr("value",$(ans).find("answer").attr("semail"));
				var htmlclasssel ="";
				$(ans).find("option").each(function(){
					var isopenclass=(1==$(this).attr("isopen"))?'���ѿ��Σ�':'';
					var shownlimit="&nbsp;&nbsp;";
					if($(this).attr("slimit")!=""){
						if(parseInt($(this).attr("snum"))==0)shownlimit='<span style="color:green">���ա�</span>';
						else if(parseInt($(this).attr("snum"))==parseInt($(this).attr("slimit")))shownlimit='<span style="color:#FF9900">������Ա��</span>';
						if(parseInt($(this).attr("snum"))< parseInt($(this).attr("slimit")))shownlimit='<span style="color:blue"> δ����'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
						if(parseInt($(this).attr("snum"))> parseInt($(this).attr("slimit")))shownlimit='<span style="color:red"> ��Ա��'+$(this).attr("snum")+'/'+$(this).attr("slimit")+'��</span>';
					}
					if($(ans).find("option").size()==1){
						htmlclasssel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel" checked> <span style="font-weight:bold;font-size:13px;"> '+$(this).attr("name")+'</span><span>('+$(this).attr("area")+')</span>'+shownlimit+'<span style="size:11px;color:#999">�������ڣ�'+$(this).attr("open")+isopenclass+'</span></label></li>';
					}else{
						htmlclasssel+='<li><label><input type="radio" value="'+$(this).attr("id")+'" name="Operatesel"> <span style="font-weight:bold;font-size:13px;">'+$(this).attr("name")+'</span><span>('+$(this).attr("area")+')</span>'+shownlimit+'<span style="size:11px;color:#999">�������ڣ�'+$(this).attr("open")+isopenclass+'</span></label></li>';
					}
				});
				$("#Operatesel").html(htmlclasssel);
				JudgeWindowSizetoCss("#Operate");
			}
		},
		complete:function(){
		}
	});
};

var SQueue=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>����Ա�༶ռλ�Ŷӣ�<hr><div id="Operatesel"></div></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 38px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'SQueue\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetQueueClassSels(i);
	showForm("#Operate","#fade");
};

var Srecord=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>��ѧ��¼��</li>';
	htmlOperate+='<li><textarea cols="51" id="OperateComment" style="width:90%; height: 48px"></textarea></li>';
	htmlOperate+='<span id="SpanIsSFocus" />';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Srecord\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetIsSFocus(i);
	showForm("#Operate","#fade");
};

var GetIsSFocus=function(i){
	var requests={"question":"GetIsSFocus","id":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html("");
			}
			if(1010==err){
				var htmlspanisfocus='';
				gopage=$(ans).find("answer").attr("gopage");
				if(1==$(ans).find("answer").attr("note"))htmlspanisfocus = '<hr style="border:1px dashed #ccc;"><li style="text-align:left;color:#999;">>>> <span style="font-weight:bold;color:#00b6cf;font-size:12px;line-height:30px;">�ص���ע����������</span> <input style="margin-bottom:-2px;" id="OperateCheck" type="checkbox" onclick="ToSTracks();" checked/> <label id="inputSTracks" style="display:display">��<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+gopage+'" /></label></li><hr style="border:1px dashed #ccc;">';
				else htmlspanisfocus = '<hr style="border:1px dashed #ccc;"><li style="text-align:left;color:#999;">>>> <span style="font-weight:bold;color:#00b6cf;font-size:12px;line-height:30px;">�ص���ע����������</span> <input style="margin-bottom:-2px;" id="OperateCheck" type="checkbox" onclick="ToSTracks();" /> <label id="inputSTracks" style="display:none">��<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+gopage+'" /></label></li><hr style="border:1px dashed #ccc;">';
				$("#Operateloading").html("");
				$("#SpanIsSFocus").html(htmlspanisfocus);
			}
		},
		complete:function(){
		}
	});
};

var ToSTracks=function(){
	if($("#OperateCheck").attr("checked"))$("#inputSTracks").show();
	else $("#inputSTracks").hide();
};

var Ssuggest=function(i){
	$("#Operate2").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>&nbsp;&nbsp;>>> <input type="button" onclick="checkWeekly();" value=" �鿴ѧԱ�ܱ� " />&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick="CloseWin2(\'Operate2\');" style="color:blue;text-decoration:none;">[ �ر� ]</a></li><hr>';
	htmlOperate+='<ul id="asslist" style="text-align:left;line-height:20px;"></ul>';
	htmlOperate+='<hr>';
	htmlOperate+='<li id="assinput" style="text-align:left;"></li>';
	htmlOperate+='<li style="text-align:left;"><span id="assbutton"></span> <span id="OperateloadingA" style="color:red;"></span></li>';
	$("#Operate2").html(htmlOperate);
	GetAssesslist(i);
	showForm("#Operate2","#fade");
};

var GiveupEmploy=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>��������ҵָ����</li>';
	htmlOperate+='<li style="text-align:left;">����ԭ����<textarea cols="51" id="OperateComment" style="width:80%; height: 48px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'GiveupEmploy\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var checkWeekly=function(){
	showForm("#Weekly","null");
	var requests={"question":"checkWeekly","sid":suid};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Weekly").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin1(\'Weekly\');">�ر�</a>]');
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
				hideForm("#Weekly","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1==err){
				if($(ans).find("answer").attr("step1")==0&&$(ans).find("answer").attr("step2")==0){
					alert("��ѧԱ��û���ܱ���Ϣ��");
					hideForm("#Weekly","null");
				}else{
					var htmldata='<div style="text-align:right;"><input name="cancel" onclick="CloseWin1(\'Weekly\');" type="button" value=" �ر� " /></div>';
					if($(ans).find("answer").attr("step1")>0){
						htmldata+='<table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
						htmldata+='<tr><th colspan="9" style="background-color:#F7F2E0;">��ѧ�׶�</th></tr><tr style="font-weight:bold;background-color:#F7F2E0;"> ';
				    htmldata+='<td width="10%">����</td>';
				    htmldata+='<td width="15%">���յ�</td>';
				    htmldata+='<td width="15%">ģ��������</td>';
				    htmldata+='<td width="15%">û�����յ�</td>';
				    htmldata+='<td width="15%">ѧϰ�ĵ�</td>';
				    htmldata+='<td width="15%">���˷�ʡ</td>';
				    htmldata+='<td width="15%">���˽���</td>';
				    $(ans).find("step1").find("data").each(function(){
							htmldata+='<tr style="line-height:20px;word-break:break-all;"><td><span style="font-color:#CCCCCC;">��'+$(this).find("cname").text()+'��</span></td><td>'+($(this).find("s1").text()==""?"-":$.base64({data:$(this).find("s1").text(),type:1}))+'</td><td>'+($(this).find("s2").text()==""?"-":$.base64({data:$(this).find("s2").text(),type:1}))+'</td><td>'+($(this).find("s3").text()==""?"-":$.base64({data:$(this).find("s3").text(),type:1}))+'</td><td>'+($(this).find("s4").text()==""?"-":$.base64({data:$(this).find("s4").text(),type:1}))+'</td><td>'+($(this).find("s5").text()==""?"-":$.base64({data:$(this).find("s5").text(),type:1}))+'</td><td>'+($(this).find("z").text()==""?"-":$.base64({data:$(this).find("z").text(),type:1}))+'</td></tr>';
						});htmldata+='</table>';
					}	
					if($(ans).find("answer").attr("step2")>0){
						htmldata+='<hr style="border:1px dashed #ccc;"><table border="1" width=100% cellpadding="0" cellspacing="0" style="text-align:center;">';
						htmldata+='<tr><th colspan="10" style="background-color:#F7F2E0;">��Ŀ�׶�</th></tr><tr style="font-weight:bold;background-color:#F7F2E0;"> ';
						htmldata+='<td width="10%">����</td>';
				    htmldata+='<td width="10%">�з���Ա</td>';
				    htmldata+='<td width="10%">��Ŀ����</td>';
				    htmldata+='<td width="10%">��Ŀ����</td>';
				    htmldata+='<td width="10%">����������</td>';
				    htmldata+='<td width="10%">��������</td>';
				    htmldata+='<td width="10%">�з�����</td>';
				    htmldata+='<td width="15%">�ܽ�</td>';
				    htmldata+='<td width="15%">���˽���</td>';
				    $(ans).find("step2").find("data").each(function(){
							htmldata+='<tr style="line-height:20px;word-break:break-all;"><td>��'+$(this).find("cname").text()+'��</td><td>'+($(this).find("p1").text()==""?"-":$.base64({data:$(this).find("p1").text(),type:1}))+'</td><td>'+($(this).find("p2").text()==""?"-":$.base64({data:$(this).find("p2").text(),type:1}))+'</td><td>'+($(this).find("p3").text()==""?"-":$.base64({data:$(this).find("p3").text(),type:1}))+'</td><td>'+($(this).find("p4").text()==""?"-":$.base64({data:$(this).find("p4").text(),type:1}))+'</td><td>'+($(this).find("p5").text()==""?"-":$.base64({data:$(this).find("p5").text(),type:1}))+'</td><td>'+($(this).find("p6").text()==""?"-":$.base64({data:$(this).find("p6").text(),type:1}))+'</td><td>'+($(this).find("p7").text()==""?"-":$.base64({data:$(this).find("p7").text(),type:1}))+'</td><td>'+($(this).find("z").text()==""?"-":$.base64({data:$(this).find("z").text(),type:1}))+'</td></tr>';
						});htmldata+='</table>';
					}
					htmldata+='<br><div style="text-align:right;"><input name="cancel" onclick="CloseWin1(\'Weekly\');" type="button" value=" �ر� " /></div>';
					$("#Weekly").html(htmldata);
					JudgeWindowSizetoCss("#Weekly");
				}
			}
		},
		complete:function(){
		}
	});
};

var GetAssesslist=function(i){
	var requests={"question":"GetAssesslist","id":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OperateloadingA").html(htmlimgo);
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
				$("#OperateloadingA").html("");
				$("#asslist").html('<li><span style="color:#999;">'+$(ans).find("answer").attr("note")+'</span></li>');
			}
			if(1==err){
				$("#OperateloadingA").html("");
				var htmlasslist=htmlyes=htmldid='';
				$(ans).find("alist").each(function(){
					if(0<$(this).attr("alit")){
						htmldid='<input class="acell" id="acell'+$(this).attr("id")+'" type="button" onclick="toggleCell('+$(this).attr("id")+','+$(this).attr("alit")+',\''+$(this).attr("atext")+'\',\''+$(this).attr("acomm")+'\');" value=" '+($(this).attr("atime")==""?">>> ��д�ܽ�":"�޸�")+' " />';
					}else{
						htmldid=($(this).attr("atime")!="")?'<a class="acell" id="acell'+$(this).attr("id")+'" style="color:blue;text-decoration:none;" href="javascript:void(0);" onclick="toggleCell('+$(this).attr("id")+','+$(this).attr("alit")+',\''+$(this).attr("atext")+'\',\''+$(this).attr("acomm")+'\');" >[ �鿴 ]</a>':'';
					}
					htmlyes=($(this).attr("atime")!="")?'<span style="color:green;font-size:18px;">��</span><span style="color:#cecece;">('+$(this).attr("atime")+')</span>':'<span style="color:red;font-size:18px;">��</span><span style="color:#cecece;">(��δ�ܽ�)</span>';
					htmlasslist+='<li><span class="flagAss" id="flagAss'+$(this).attr("id")+'" style="display:none;color:#00b6cf;font-weight:bold;">>>>>>>>>>> </span><span style="color:#666;">��'+$(this).attr("course")+'���׶��ܽᣨ'+$(this).attr("staff")+'��</span> '+htmlyes+' '+htmldid+'</li>';
					htmlasslist+='<div class="groupdiv" id="cell'+$(this).attr("id")+'" style="padding-left:8px;"></div>';
				});
				$("#asslist").html(htmlasslist);
				JudgeWindowSizetoCss("#Operate2");
			}
		},
		complete:function(){
		}
	});
};

var inputAssess=function(n){
	var orgContent=$("#OperateCommentA").attr("value");
	$('input[name="'+n+'"]').each(function(){
		if($(this).attr("checked")){
			orgContent=orgContent.replace($(this).val(),"");
			orgContent+=$(this).val();
		}else{
			orgContent=orgContent.replace($(this).val(),"");
		}$("#OperateCommentA").attr("value",orgContent);
	});
};

var toggleCell=function(i,d,a,c){
	$(".groupdiv").empty();
	$("#cell"+i).show();
	$(".acell").show();
	$("#acell"+i).hide();
	$(".flagAss").hide();
	$("#flagAss"+i).show();
	var AssContent=a==""?"":$.base64({data:a,type:1});
	var AssContent2=c==""?"":$.base64({data:c,type:1});
	var HtmlAssSelect='<hr style="border:1px dashed #ccc;"><ul>';
	if(0<d){
		HtmlAssSelect+='<label style="font-weight:bold;">����ˮƽ: </label><label><input type="radio" name="technique" value="����������" onclick="inputAssess(\'technique\');"/>����������</label><label><input type="radio" name="technique" value="�༶�е�ƫ�ϣ�" onclick="inputAssess(\'technique\');"/>�༶�е�ƫ�ϣ�</label><label><input type="radio" name="technique" value="�༶�еȣ�" onclick="inputAssess(\'technique\');"/>�༶�еȣ�</label><label><input type="radio" name="technique" value="�༶�е�ƫ�£�" onclick="inputAssess(\'technique\');"/>�༶�е�ƫ�£�</label><label><input type="radio" name="technique" value="�Ƚϲ" onclick="inputAssess(\'technique\');"/>�Ƚϲ</label><label><input type="radio" name="technique" value="��Ҫ������" onclick="inputAssess(\'technique\');"/>��Ҫ������</label><label><input type="radio" name="technique" value="������ѧ��" onclick="inputAssess(\'technique\');"/>������ѧ��</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">֪ʶ���ճ̶�: </label><label><input type="radio" name="logicalthinking" onclick="inputAssess(\'logicalthinking\');" value="��ѧ����ȫ�����գ�" />��ѧ����ȫ�����գ�</label><label><input type="radio" name="logicalthinking" onclick="inputAssess(\'logicalthinking\');" value="�����˴󲿷���ѧ���ݣ�" />�����˴󲿷���ѧ���ݣ�</label><label><input type="radio" name="logicalthinking" onclick="inputAssess(\'logicalthinking\');" value="��������Ҫ��֪ʶ�㣻" />��������Ҫ��֪ʶ�㣻</label><label><input type="radio" name="logicalthinking" onclick="inputAssess(\'logicalthinking\');" value="ֻ������һ����֪ʶ�㣻" />ֻ������һ����֪ʶ�㣻</label><label><input type="radio" name="logicalthinking" onclick="inputAssess(\'logicalthinking\');" value="���յ�֪ʶ�������޼���" />���յ�֪ʶ�������޼���</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">������: </label><label><input type="radio" name="initiative" onclick="inputAssess(\'initiative\');" value="�����Ժ�ǿ���������ɵ��������񣬻���������չһЩ���ݣ�" />�����Ժ�ǿ���������ɵ��������񣬻���������չһЩ���ݣ�</label><label><input type="radio" name="initiative" onclick="inputAssess(\'initiative\');" value="������һ�㣬�����������ܻ������ɣ�" />������һ�㣬�����������ܻ������ɣ�</label><label><input type="radio" name="initiative" onclick="inputAssess(\'initiative\');" value="�����Խϲ��Ҫ��ʦ�ල�ٲ������ɣ�" />�����Խϲ��Ҫ��ʦ�ල�ٲ������ɣ�</label><label><input type="radio" name="initiative" onclick="inputAssess(\'initiative\');" value="�����Ժܲ˭�ܶ�����ʹ��" />�����Ժܲ˭�ܶ�����ʹ��</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">�ٵ�����: </label><label><input type="radio" name="belated" onclick="inputAssess(\'belated\');" value="�Ӳ��ٵ������ˣ�" />�Ӳ��ٵ������ˣ�</label><label><input type="radio" name="belated" onclick="inputAssess(\'belated\');" value="���������ٵ�������������" />���������ٵ�������������</label><label><input type="radio" name="belated" onclick="inputAssess(\'belated\');" value="�����ٵ������ˣ�" />�����ٵ������ˣ�</label><label><input type="radio" name="belated" onclick="inputAssess(\'belated\');" value="�����ȵ����࣬ż���ٵ������ˣ�" />�����ȵ����࣬ż���ٵ������ˣ�</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">��������: </label><label><input type="radio" name="leaveoff" onclick="inputAssess(\'leaveoff\');" value="�������٣�" />�������٣�</label><label><input type="radio" name="leaveoff" onclick="inputAssess(\'leaveoff\');" value="ż�����٣�" />ż�����٣�</label><label><input type="radio" name="leaveoff" onclick="inputAssess(\'leaveoff\');" value="�Ӳ����٣�" />�Ӳ����٣�</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">���ü���: </label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽμ��ɺܺã�����ʦ�ܹ��ܺõ����ϣ�" />�Ͽμ��ɺܺã�����ʦ�ܹ��ܺõ����ϣ�</label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽμ��ɺܺã����ǲ�˵��������ʦû������" />�Ͽμ��ɺܺã����ǲ�˵��������ʦû������</label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽ��ҽ����磻" />�Ͽ��ҽ����磻</label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽ�Ƶ���ʲ������������Ͽ��ý��ȣ�" />�Ͽ�Ƶ���ʲ������������Ͽ��ý��ȣ�</label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽ�һֱ��ͷ����֪���ڸ�ɶ��" />�Ͽ�һֱ��ͷ����֪���ڸ�ɶ��</label><label><input type="radio" name="disciplabelne" onclick="inputAssess(\'disciplabelne\');" value="�Ͽξ���������˯��" />�Ͽξ���������˯��</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">������������: </label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="�������Լ��������⣬���ܰ�ͬѧ�������⣻" />�������Լ��������⣬���ܰ�ͬѧ�������⣻</label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="���������������������������⼸�������Լ�������" />���������������������������⼸�������Լ�������</label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="������������һ�㣬�����������ܽ���һ���֣�����һ���ֽ������ˣ�" />������������һ�㣬�����������ܽ���һ���֣�����һ���ֽ������ˣ�</label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="��ʦ�������������������У�û����������û�н���˼·��" />��ʦ�������������������У�û����������û�н���˼·��</label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="ͨ���ұ��˽������⣻" />ͨ���ұ��˽������⣻</label><label><input type="radio" name="solusionable" onclick="inputAssess(\'solusionable\');" value="û�н�������������Ҳ��ȥ�ʣ�" />û�н�������������Ҳ��ȥ�ʣ�</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">��ͨ����: </label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="������ͬѧ������������������������" />������ͬѧ������������������������</label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="���ܱߵ��˽�������Զ�Ĳ���ͨ��" />���ܱߵ��˽�������Զ�Ĳ���ͨ��</label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="ֻ��ͬ����ͨ���������˼�������ͨ��" />ֻ��ͬ����ͨ���������˼�������ͨ��</label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="������ͦ���ģ������˼�����˵����" />������ͦ���ģ������˼�����˵����</label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="��ͬѧ�����Ƚ��٣�������û�����⣻" />��ͬѧ�����Ƚ��٣�������û�����⣻</label><label><input type="radio" name="conmunication" onclick="inputAssess(\'conmunication\');" value="�Ագ�����˵��������Ҳ����������" />�Ագ�����˵��������Ҳ����������</label></li>';
		HtmlAssSelect+='<li><label style="font-weight:bold;">�߼�˼ά: </label><label><input type="radio" name="logicable" onclick="inputAssess(\'logicable\');" value="�б����츳��һ�㼴�ƣ�" />�б����츳��һ�㼴�ƣ�</label><label><input type="radio" name="logicable" onclick="inputAssess(\'logicable\');" value="����������ǿ����ʦ���Ķ����������ܿ죻" />����������ǿ����ʦ���Ķ����������ܿ죻</label><label><input type="radio" name="logicable" onclick="inputAssess(\'logicable\');" value="��������һ�㣬��������ʦ�������ݣ�" />��������һ�㣬��������ʦ�������ݣ�</label><label><input type="radio" name="logicable" onclick="inputAssess(\'logicable\');" value="�ȱ��������ģ�" />�ȱ��������ģ�</label><label><input type="radio" name="logicable" onclick="inputAssess(\'logicable\');" value="�ȱ�����2�ģ�" />�ȱ�����2�ģ�</label></li>';
		HtmlAssSelect+='</ul>';
		HtmlAssSelect+='<textarea cols="51" id="OperateCommentA" style="width:99%; height:45px" disabled>'+AssContent+'</textarea><hr style="border:1px dashed #eee;">��ע��<textarea id="OperateCommentB" style="width:93%; height:20px">'+AssContent2+'</textarea><hr style="border:1px dashed #ccc;">';;
		HtmlAssSelect+='<label><input type=hidden id="Soption" value="'+i+'" /><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Ssuggest\');" value="ȷ��" /></label> <label><input name="cancel" onclick="CloseAssess('+i+');" type="button" value="ȡ��" /></label>';
	}else{
		HtmlAssSelect+=AssContent+(AssContent2==''?'':'��'+AssContent2+'��');
		HtmlAssSelect+='<a style="color:blue;text-decoration:none;" href="javascript:void(0);" onclick="CloseAssess('+i+');" > <<< ����</a>';
	}HtmlAssSelect+='<hr>';
	$("#cell"+i).html(HtmlAssSelect);
	$('input[type="radio"]').each(function(){
		if(AssContent.indexOf($(this).val()) >= 0)$(this).attr("checked",true);
	});
	JudgeWindowSizetoCss("#Operate2");
};

var CloseAssess=function(i){
	$("#cell"+i).hide();
	$("#acell"+i).show();
	$("#flagAss"+i).hide();
}

var SDocument=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>ֽ�ʵ������ϣ�</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;" id="docslist"></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'SDocument\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetDocslist(i);
	showForm("#Operate","#fade");
};

var SendtoEmail=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li>�Ƿ�Ҫ����<span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text().replace("@",""):$("#studentName"+i).text().replace("@",""))+'</span>�����ʼ���</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'SendtoEmail\');" value="����" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var GetDocslist=function(i){
	var requests={"question":"GetDocslist","id":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmldoclist ="";
				var templid;
				$(ans).find("dlist").each(function(){
					var isdocchecked=(1==$(this).attr("checked"))?'checked':'';
					var isdisabled=(1==$(this).attr("disable"))?'disabled':'';
					if(($(this).attr("id")-templid)>1)htmldoclist+='<hr style="border:1px dashed #ccc;">';
					htmldoclist+='<label><input class="checklists" type="checkbox" value="'+$(this).attr("id")+'" name="checklist" '+isdocchecked+' '+isdisabled+'/> '+$(this).attr("name")+'��</label>';
					templid = $(this).attr("id");
					if(1==$(this).attr("disable"))$("#submitoperate").css("display","none");
				});
				$("#docslist").html(htmldoclist);
			}
		},
		complete:function(){
		}
	});
};

var SDetail=function(i){
	suid=i;
	GetStudentDetail("SDetail");
	showForm("#Details","#fade");
};

var GotoLearnRecord=function(i){
	hideForm("#Details","#fade");
	Srecord(i);
};

var GotoLearnDocs=function(i){
	hideForm("#Details","#fade");
	SDocument(i);
};

var GetStudentDetail=function(t){
	var requests={"question":"GetStudentDetails","type":t,"suid":suid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Details").html(htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">��ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span><span>'+($(ans).find("class").text()==''?'':'��'+$(ans).find("class").text()+'��')+'</span>��';
				var cname=$(ans).find("name").text()==""?"":'<span style="font-weight:bold;">������</span><span style="font-weight:bold;color:blue;">'+$(ans).find("name").text()+'</span>��';
				var snumber=$(ans).find("snumber").text()==""?"":'<span style="font-weight:bold;">ѧ�ţ�</span>'+$(ans).find("snumber").text()+'��';
				var csex=$(ans).find("sex").text()==""?"":'<span style="font-weight:bold;">�Ա���</span>'+$(ans).find("sex").text()+'��';
				var ctel=$(ans).find("tel").text()==""?"":'<span style="font-weight:bold;">�绰��</span>'+$(ans).find("tel").text()+'��';
				var cim=$(ans).find("im").text()==""?"":'<span style="font-weight:bold;">QQ��</span>'+$(ans).find("im").text()+'��';
				var cemergname=$(ans).find("semergname").text()==""?"":'<span style="font-weight:bold;">������ϵ�ˣ�</span>'+$(ans).find("semergname").text()+'��';
				var cemergtel=$(ans).find("semergtel").text()==""?"":'<span style="font-weight:bold;">��ϵ�˵绰��</span>'+$(ans).find("semergtel").text()+'��';
				var cstyle=$(ans).find("style").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">��ѯ��ʽ��</span><span style="color:#CC6633">'+$(ans).find("style").text()+'</span>��';
				var ctender=$(ans).find("tender").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ѧ������</span>'+$(ans).find("tender").text()+'��';
				var cfoundate=$(ans).find("foundate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">������</span>'+$(ans).find("foundate").text()+'��';
				var ceducate=$(ans).find("educate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">ѧ����</span>'+$(ans).find("educate").text()+'��';
				var ccollege=$(ans).find("college").text()==""?"":'<span style="font-weight:bold;">��ҵԺУ��</span>'+$(ans).find("college").text()+'��';
				var cprof=$(ans).find("prof").text()==""?"":'<span style="font-weight:bold;">��ѧרҵ��</span>'+$(ans).find("prof").text()+'��';
				var carea=$(ans).find("area").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">������</span>'+$(ans).find("area").text()+'��';
				var ccurrent=$(ans).find("current").text()=="��ѡ��"?"":'<span style="font-weight:bold;">Ŀǰ״����</span>'+$(ans).find("current").text()+'��';
				var cfrom=$(ans).find("from").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��Դ��</span>'+$(ans).find("from").text()+'��';
				var ckeyword=$(ans).find("keyword").text()==""?"":'<span style="font-weight:bold;">�����ؼ��ʣ�</span>'+$(ans).find("keyword").text()+'��';
				var crefer=$(ans).find("refer").text()==""?"":'<br /><span style="font-weight:bold;">�����ˣ�</span>'+$(ans).find("refer").text()+'��';
				var ccomment=$(ans).find("comment").text()==""?"":'<br /><span style="font-weight:bold;">��ѯҪ�㣺</span>'+$(ans).find("comment").text()+'��';
				var oprecord=$(ans).find("isrecord").text()==0?'':'<input type="button" value=" ���ӽ�ѧ��¼ " onclick="GotoLearnRecord('+$(ans).find("sid").text()+');" />';
				var opedit=$(ans).find("isedit").text()==0?'':' <input type="button" value=" �༭ѧ������ " onclick="GotoSEdit('+$(ans).find("sid").text()+');" />';
				var opdocs=$(ans).find("isdocs").text()==0?'':' <input type="button" value=" ���µ�����¼ " onclick="GotoLearnDocs('+$(ans).find("sid").text()+');" />';
				var opinterv=$(ans).find("isinterv").text()==0?'':' <input type="button" value=" ������̸ " onclick="GotoLearnInterv('+$(ans).find("sid").text()+');" />';
				var ccreditid=$(ans).find("creditid").text()==""?"":'<span style="font-weight:bold;">֤�����룺</span>'+$(ans).find("creditid").text()+'��';
				var cfeeway=$(ans).find("feeway").text()=="��ѡ��"?"":'<span style="font-weight:bold;">�ɿ���ʽ��</span>'+$(ans).find("feeway").text()+'��';
				var cgraduate=$(ans).find("graduate").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ҵ���ݣ�</span>'+$(ans).find("graduate").text()+'�ꣻ';
				var htmldetails="";
				htmldetails+='<div style="float:right;"><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div><hr>';
				htmldetails+='<div>'+cname+stat+snumber+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;">';
				htmldetails+='<div>'+csex+ctel+cim+cemergname+cemergtel+cstyle+cfoundate+ceducate+ccollege+cprof+cgraduate+carea+ccurrent+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				htmldetails+='<li>'+ccreditid+cfeeway+'</li>';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				}
				htmldetails+='<li>'+oprecord+opedit+opdocs+opinterv+'</li>';
				if(oprecord!=""||opedit!=""||opdocs!=""||opinterv!="")htmldetails+='<hr style="border:1px dashed #ccc;">';
				if(0<$(ans).find("listdata").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC6699;border-radius:4px;">��ѧ��̸��Ϣ��</span><li/>';
					var htmlentrancelist='<table width="100%" cellpadding="0" cellspacing="1" style="border:1px #CCC solid;text-align:center;"><tr><th width="5%" style="background-color:#DDD;"></th><th colspan="7" style="background-color:#DDD;font-weight:bold;line-height:18px;">��ҵ����</th><th colspan="4" style="background-color:#DDD;font-weight:bold;line-height:18px;">��������</th></tr>';
					htmlentrancelist+='<tr style="line-height:18px;background-color:#ccc;"><td style="font-weight:bold;">��¼��</td><td style="font-weight:bold;">�Ը�</td><td style="font-weight:bold;">��ͨ����</td><td style="font-weight:bold;">��̬</td><td style="font-weight:bold;">��ҵ�뷨</td><td style="font-weight:bold;">֮ǰ����</td><td style="font-weight:bold;">���۽���</td><td style="font-weight:bold;">��ע</td><td style="font-weight:bold;">��������</td><td style="font-weight:bold;">��������</td><td style="font-weight:bold;">���۽���</td><td style="font-weight:bold;">��ע</td></tr>';
					$(ans).find("listdata").each(function(){
						htmlentrancelist+='<tr style="line-height:18px;"><td style="background-color:#DDD;">'+$(this).find("uname").text()+'</td><td style="background-color:#DDD;">'+$(this).find("character").text()+'</td><td style="background-color:#DDD;">'+$(this).find("communicate").text()+'</td><td style="background-color:#DDD;">'+$(this).find("mentality").text()+'</td><td style="background-color:#DDD;">'+$(this).find("thought").text()+'</td><td style="background-color:#DDD;">'+$(this).find("experience").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("language").text()+'</td><td style="background-color:#DDD;">'+$(this).find("project").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_T").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_T").text()+'</td></tr>';
					});
					htmlentrancelist+='</table>';
					htmldetails+=htmlentrancelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("dayoff").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC6633;border-radius:4px;">���ټ�¼��</span></li>';
					htmldetails+='<li style="font-weight:bold;">>>> ���١�'+$(ans).find("dayoff").attr("count")+'���Σ��ۼơ�'+(parseInt($(ans).find("dayoff").attr("limit"))<parseInt($(ans).find("dayoff").attr("length"))?'<span style="color:red;">'+$(ans).find("dayoff").attr("length")+'</span>':$(ans).find("dayoff").attr("length"))+'��Сʱ</li>';
					if(0<$(ans).find("dayofflists").size()){
						$(ans).find("dayofflists").each(function(){
							htmldetails+='<li>'+$(this).attr("ddate")+'��'+$(this).attr("length")+'��Сʱ��'+$(this).attr("user")+'��>>> '+$(this).attr("comm")+'</li>'
						});
					}htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("studycredit").size()){
					var colorCreditA=colorCreditD='#00BFFF';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					htmldetails+='<li><span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditA+';border-radius:4px;">���� '+creditA+'</span> <span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditD+';border-radius:4px;">���� '+creditD+'</span></li><hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("resexam").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#319fcc;border-radius:4px;">���Գɼ���</span></li>';
					var htmlexamlist='<li>';
					$(ans).find("resexam").each(function(){
						htmlexamlist+='<label style="margin-right:10px;"><span style="color:#319fcc;font-weight:bold;">'+$(this).find("ename").text()+'��</span><span style="font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;">'+$(this).find("result").text()+'��ѡ���жϣ�</span>��</label>';
					});
					htmlexamlist+='</li>';
					htmldetails+=htmlexamlist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("assess").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#29C797;border-radius:4px;">�׶��ܽ᣺</span><li/>';
					var htmlassesslist='';
					$(ans).find("assess").each(function(){
						htmlassesslist+='<li><span style="color:#319fcc;">'+$(this).find("atime").text()+'��'+$(this).find("acourse").text()+'��'+$(this).find("auser").text()+'</span> >>> <div style="text-indent:2em;">'+($.base64({data:$(this).find("atext").text(),type:1})+($(this).find("acomm").text()==""?"":"��"+$.base64({data:$(this).find("acomm").text(),type:1})+"��"))+'</div></li>';
					});htmldetails+=htmlassesslist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("weekly").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#22A334;border-radius:4px;">ѧϰ�ܱ���</span><li/>';
					var htmlrulelist='';
					$(ans).find("weekly").each(function(){
						htmlrulelist+='<li><span>'+$(this).find("wtime").text()+'��'+$(this).find("wtype").text()+'��'+$(this).find("wDate").text()+'�� '+$(this).find("wcourse").text()+' �ܱ�</span> >> <a style="color:#08971B;text-decoration: none;" href="javascript:void(0); onclick=checkStuWeekly('+$(this).attr("id")+');">[ �鿴 ]</a></li>';
					});htmldetails+=htmlrulelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("rules").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#ff0000;border-radius:4px;">Υ�ͼ�¼��</span></li>';
					var htmlrulelist='';
					$(ans).find("rules").each(function(){
						htmlrulelist+='<li><span>'+$(this).find("rtime").text()+'</span> >>> <span style="color:#FE642E;font-weight:bold;">'+$(this).find("rname").text()+'��</span><span style="color:#00b6cf;">��'+$(this).find("ruledate").text()+'��</span>'+$(this).find("rcomment").text()+'</li>';
					});htmldetails+=htmlrulelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("jobtrain").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#F7BE81;border-radius:4px;">��ҵ����Ϣ��</span></li>';
					var htmljobtraininglist='��ҵ�α��Գɼ���'+(""==$(ans).find("jobtrain").attr("credit")?"<span style='color:#999;'>����</span>":"<span style='font-size:16px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;'>"+$(ans).find("jobtrain").attr("credit"))+"</span>"+'<br/>������ҵ������'+(""==$(ans).find("jobtrain").attr("area")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("area"))+'��&nbsp;&nbsp;��������������'+(""==$(ans).find("jobtrain").attr("jobxp")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("jobxp"));
					htmldetails+=htmljobtraininglist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("interview").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC22CC;border-radius:4px;">ģ�����Լ�¼��</span></li>';
					var htmlinterviewlist='';
					$(ans).find("interview").each(function(){
						htmlinterviewlist+='<li>>>> ['+$(this).find("Mtime").text()+']</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffT").text()+'</span> >>> �������֡�'+$(this).find("MtotolT").text()+'������н�ʣ�'+(($(this).find("MsalaryT").text()==''||$(this).find("MsalaryT").text()==0)?'��':$(this).find("MsalaryT").text())+'</li>';
						htmlinterviewlist+='<li style="color:#999;">�������'+($(this).find("MevalT").text()==''?'��':$.base64({data:$(this).find("MevalT").text(),type:1}))+($(this).find("McommT").text()==''?'':'��'+$.base64({data:$(this).find("McommT").text(),type:1})+'��')+'</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffR").text()+'</span> >>> ��ҵ���֡�'+$(this).find("MtotolR").text()+'������н�ʣ�'+(($(this).find("MsalaryR").text()==''||$(this).find("MsalaryR").text()==0)?'��':$(this).find("MsalaryR").text())+'</li>';
						htmlinterviewlist+='<li style="color:#999;">��ҵ���'+($(this).find("MevalR").text()==''?'��':$.base64({data:$(this).find("MevalR").text(),type:1}))+($(this).find("McommR").text()==''?'':'��'+$.base64({data:$(this).find("McommR").text(),type:1})+'��')+'</li>';
					});htmldetails+=htmlinterviewlist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				htmldetails+='<input id="buttonshowdetail" type="button" value=" ��ʾȫ����ѯ��־ + " onclick="showCusTrace();" /> >>><ul id="custrace" style="display:none;">';
				$(ans).find("ctrace").each(function(){
					var ctracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+ctracecomment+'</li>';
				});htmldetails+='<hr style="border:1px dashed #ccc;"></ul>';
				$(ans).find("trace").each(function(){
					var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
				});
				htmldetails+='</ul><hr>';
				htmldetails+= '<br/><div><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div>';
				$("#Details").html(htmldetails);
				JudgeWindowSizetoCss("#Details");
			}
		},
		complete:function(){
		}
	});
};

var checkStuWeekly=function(i){
	showForm("#DetailOver","#fade3");
	var requests={"question":"checkStuWeekly","wid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#DetailOver").html(htmlimgo+' [<a href="javascript:void(0);" onclick="CloseWin3(\'DetailOver\');">�ر�</a>]');
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
				hideForm("#DetailOver","null");
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				var wtype=$(ans).find("answer").attr("note");
				var htmldata='<div style="font-size:16px;text-align:center;">'+$(ans).find("answer").attr("gopage")+'�ܱ�</div><input style="float:right;" name="cancel" onclick="CloseWin3(\'DetailOver\');" type="button" value=" �ر� " /><hr style="border:1px dashed #ccc;"><div>';
				switch(wtype){
					case "1":
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">���յ�֪ʶ�㣺����</span>'+(!$.base64({data:$(ans).find("answer").attr("s1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s1"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">ģ��������֪ʶ�㣺</span>'+(!$.base64({data:$(ans).find("answer").attr("s2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s2"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">û�����յ�֪ʶ�㣺</span>'+(!$.base64({data:$(ans).find("answer").attr("s3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s3"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">ѧϰ�ĵã���������</span>'+(!$.base64({data:$(ans).find("answer").attr("s4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s4"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">���˷�ʡ����������</span>'+(!$.base64({data:$(ans).find("answer").attr("s5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("s5"),type:1}))+'</li>';
					break;
					case "2":
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">�з���Ա����������</span>'+(!$.base64({data:$(ans).find("answer").attr("p1"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p1"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">��Ŀ���ƣ���������</span>'+(!$.base64({data:$(ans).find("answer").attr("p2"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p2"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">��Ŀ���飺��������</span>'+(!$.base64({data:$(ans).find("answer").attr("p3"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p3"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">���������⣺������</span>'+(!$.base64({data:$(ans).find("answer").attr("p4"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p4"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">������������������</span>'+(!$.base64({data:$(ans).find("answer").attr("p5"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p5"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">�з����ȣ���������</span>'+(!$.base64({data:$(ans).find("answer").attr("p6"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p6"),type:1}))+'</li>';
						htmldata+='<li style="padding-left:10px;"><span style="font-size:14px;font-weight:bold;color:#05207A;">�ܽ᣺������������</span>'+(!$.base64({data:$(ans).find("answer").attr("p7"),type:1})?"":$.base64({data:$(ans).find("answer").attr("p7"),type:1}))+'</li>';
					break;
				}htmldata+='<li style="padding-left:10px;"><span style="font-size:16px;font-weight:bold;color:#05207A;">���˽��飺������</span>'+(!$.base64({data:$(ans).find("answer").attr("z"),type:1})?"":$.base64({data:$(ans).find("answer").attr("z"),type:1}))+'</li>';
				htmldata+='</div><input style="float:left;" name="cancel" onclick="CloseWin3(\'DetailOver\');" type="button" value=" �ر� " /><hr style="border:1px dashed #ccc;">';
				$("#DetailOver").html(htmldata);
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#DetailOver");
		}
	});
};

var showCusTrace=function(){
	if($("#custrace").css("display")=='none'){
		$("#buttonshowdetail").attr("value"," ������ѯ��־ - ");
		$("#custrace").show();
	}else{
		$("#buttonshowdetail").attr("value"," ��ʾȫ����ѯ��־ + ");
		$("#custrace").hide();
	}JudgeWindowSizetoCss("#Details");
};

var Interview=function(i){
	suid=i;
	showForm("#Mock","#fade");
	var requests={"question":"GetStudentMocklist","sid":suid};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Mock").html('���ڼ���...'+htmlimgo+' <input type="button" onclick="CloseW(\'Mock\');" value="�ر�" />');
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
				hideForm("#Mock","#fade");
				GetStudentCondition();
				if(!$("#teachlist").is(":hidden"))showTeachDetailList(Limitclass);
				alert($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				var mockhtml='<hr style="border:1px dashed #eee;"><li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>ģ�����ԣ�</li><hr style="border:1px dashed #ccc;">';
				if(0<$(ans).find("listdata").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#8181F7;border-radius:4px;">��ѧ��̸��Ϣ��</span><li/>';
					var htmlentrancelist='<table width="100%" cellpadding="0" cellspacing="1" style="border:1px #CCC solid;text-align:center;"><tr><th width="5%" style="background-color:#DDD;"></th><th colspan="7" style="background-color:#DDD;font-weight:bold;line-height:18px;">��ҵ����</th><th colspan="4" style="background-color:#DDD;font-weight:bold;line-height:18px;">��������</th></tr>';
					htmlentrancelist+='<tr style="line-height:18px;background-color:#ccc;"><td style="font-weight:bold;">��¼</td><td style="font-weight:bold;">�Ը�</td><td style="font-weight:bold;">��ͨ</td><td style="font-weight:bold;">��̬</td><td style="font-weight:bold;">��ҵ</td><td style="font-weight:bold;">����</td><td style="font-weight:bold;">����</td><td style="font-weight:bold;">��ע</td><td style="font-weight:bold;">����</td><td style="font-weight:bold;">����</td><td style="font-weight:bold;">����</td><td style="font-weight:bold;">��ע</td></tr>';
					$(ans).find("listdata").each(function(){
						htmlentrancelist+='<tr style="line-height:18px;"><td style="background-color:#DDD;">'+$(this).find("uname").text()+'</td><td style="background-color:#DDD;">'+$(this).find("character").text()+'</td><td style="background-color:#DDD;">'+$(this).find("communicate").text()+'</td><td style="background-color:#DDD;">'+$(this).find("mentality").text()+'</td><td style="background-color:#DDD;">'+$(this).find("thought").text()+'</td><td style="background-color:#DDD;">'+$(this).find("experience").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("language").text()+'</td><td style="background-color:#DDD;">'+$(this).find("project").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_T").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_T").text()+'</td></tr>';
					});
					htmlentrancelist+='</table><hr style="border:1px dashed #ccc;">';
					mockhtml+=htmlentrancelist;
				}
				if(0<$(ans).find("studycredit").size()){
					var colorCreditA=colorCreditD='#00BFFF';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					mockhtml+='<li><span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditA+';border-radius:4px;">���� '+creditA+'</span> <span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditD+';border-radius:4px;">���� '+creditD+'</span></li><hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("resexam").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#319fcc;border-radius:4px;">���Գɼ���</span></li>';
					var htmlexamlist='<li>';
					$(ans).find("resexam").each(function(){
						htmlexamlist+='<label style="margin-right:10px;"><span style="color:#319fcc;font-weight:bold;">'+$(this).find("ename").text()+'��</span><span style="font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;">'+$(this).find("result").text()+'��ѡ���жϣ�</span>��</label>';
					});
					htmlexamlist+='</li>';
					mockhtml+=htmlexamlist;
					mockhtml+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("assess").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#29C797;border-radius:4px;">�׶��ܽ᣺</span><li/>';
					var htmlassesslist='';
					$(ans).find("assess").each(function(){
						htmlassesslist+='<li><span style="color:#319fcc;">'+$(this).find("atime").text()+'��'+$(this).find("acourse").text()+'��'+$(this).find("auser").text()+'</span> >>> <div style="text-indent:2em;">'+($.base64({data:$(this).find("atext").text(),type:1})+($(this).find("acomm").text()==""?"":"��"+$.base64({data:$(this).find("acomm").text(),type:1})+"��"))+'</div></li>';
					});mockhtml+=htmlassesslist;
					mockhtml+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("rules").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#ff0000;border-radius:4px;">Υ�ͼ�¼��</span></li>';
					var htmlrulelist='';
					$(ans).find("rules").each(function(){
						htmlrulelist+='<li><span>'+$(this).find("rtime").text()+'</span> >>> <span style="color:#FE642E;font-weight:bold;">'+$(this).find("rname").text()+'��</span><span style="color:#00b6cf;">��'+$(this).find("ruledate").text()+'��</span>'+$(this).find("rcomment").text()+'</li>';
					});mockhtml+=htmlrulelist;
					mockhtml+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("jobtrain").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#F7BE81;border-radius:4px;">��ҵ����Ϣ��</span></li>';
					var htmljobtraininglist='��ҵ�α��Գɼ���'+(""==$(ans).find("jobtrain").attr("credit")?"<span style='color:#999;'>����</span>":"<span style='font-size:16px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;'>"+$(ans).find("jobtrain").attr("credit"))+"</span>"+'<br/>������ҵ������'+(""==$(ans).find("jobtrain").attr("area")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("area"))+'��&nbsp;&nbsp;��������������'+(""==$(ans).find("jobtrain").attr("jobxp")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("jobxp"));
					mockhtml+=htmljobtraininglist;
					mockhtml+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("interview").size()){
					mockhtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC22CC;border-radius:4px;">ģ�����Լ�¼��</span></li>';
					var htmlinterviewlist='';
					$(ans).find("interview").each(function(){
						htmlinterviewlist+='<li>>>> ['+$(this).find("Mtime").text()+']</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffT").text()+'</span> >>> �������֡�'+$(this).find("MtotolT").text()+'������н�ʣ�'+$(this).find("MsalaryT").text()+'</li>';
						htmlinterviewlist+='<li style="color:#999;">�������'+($(this).find("MevalT").text()==''?'��':$.base64({data:$(this).find("MevalT").text(),type:1}))+($(this).find("McommT").text()==''?'':'��'+$.base64({data:$(this).find("McommT").text(),type:1})+'��')+'</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffR").text()+'</span> >>> ��ҵ���֡�'+$(this).find("MtotolR").text()+'������н�ʣ�'+$(this).find("MsalaryR").text()+'</li>';
						htmlinterviewlist+='<li style="color:#999;">��ҵ���'+($(this).find("MevalR").text()==''?'��':$.base64({data:$(this).find("MevalR").text(),type:1}))+($(this).find("McommR").text()==''?'':'��'+$.base64({data:$(this).find("McommR").text(),type:1})+'��')+'</li>';
					});mockhtml+=htmlinterviewlist;
				}
				mockhtml+=$.base64({data:$(ans).find("answer").attr("note"),type:1})+'<hr style="border:1px dashed #eee;">';
				$("#Mock").html(mockhtml);
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#Mock");
		}
	});
};

var CheckMockValue=function(c,h){
	var sum = Number($("#mockscore1").val())+Number($("#mockscore2").val())+Number($("#mockscore3").val())+Number($("#mockscore4").val());
	if(h<Number($("#mockscore"+c).val())||0>Number($("#mockscore"+c).val())){
		alert("������0-"+h+"֮�������֣�");
		$("#mockscore"+c).attr("value",0);
		CheckMockValue(c,h);
	}else $("#mockscore").html(sum);
	if(60<=sum)$("#mockscore").css("color","green");
	else $("#mockscore").css("color","red");
};

var SubMockRes=function(){
	var s=$("#Asalary").attr("value");
	var c1=$("#mockscore1").attr("value");
	var c2=$("#mockscore2").attr("value");
	var c3=$("#mockscore3").attr("value");
	var c4=$("#mockscore4").attr("value");
	var ev=$("#Eval").attr("value");
	var co=$("#Comm").attr("value");
	var requests={"question":"SubMockRes","sid":suid,"s":s,"c1":c1,"c2":c2,"c3":c3,"c4":c4,"ev":ev,"co":co};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#submitmock").attr("disabled",true);
			$("#mockinptip").html(htmlimgo);
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
				hideForm("#Mock","#fade");
				GetStudentCondition();
				if(!$("#teachlist").is(":hidden"))showTeachDetailList(Limitclass);
				alert($(ans).find("answer").attr("note"));
			}
			if(2002==err){
				$("#mockinptip").html($(ans).find("answer").attr("note"));
				$("#submitmock").attr("disabled",false);
			}
			if(1010==err){
				hideForm("#Mock","#fade");
				GetStudentCondition();
				if(!$("#teachlist").is(":hidden"))showTeachDetailList(Limitclass);
				alert($(ans).find("answer").attr("note"));
			}
		},
		complete:function(){
		}
	});
};

var Employ=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>��ְ�Ǽǣ�</li>';
	htmlOperate+='<hr><li style="text-align:left;">��ְ��˾��<input id="String" type="text" size="20" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;"><div style="float:left; display:inline;width:180px;">��ְ������<input id="Dodate2" type="text" size="12" onfocus="showAndHide(\'emparea\',\'show\');" onblur="showAndHide(\'emparea\',\'hide\');"/>';
	htmlOperate+='<div id="emparea" style="position:absolute;left:81px;width:100px;height:atuo; z-index:9999; background: #FFF; border:1px solid #999; margin-top:0px;display:none;"></div>';
	htmlOperate+='</div>';
	htmlOperate+='<div>ְλ��<input id="OperateCommentB" type="text" size="20" onfocus="showAndHide(\'emppos\',\'show\');" onblur="showAndHide(\'emppos\',\'hide\');"/>';
	htmlOperate+='<div id="emppos" style="position:absolute;left:238px;width:145px;height:atuo; z-index:9999; background: #FFF; border:1px solid #999; margin-top:0px;display:none;"></div>';
	htmlOperate+='</div>';
	htmlOperate+='</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ְ���ڣ�<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ְ��н��<input id="Fee" type="text" size="12" /><label style="padding-left:15px;">����н�ʣ�<input id="OperateCommentA" type="text" size="12" /><span style="color:#999;">��û�пɲ��</span></label></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��Ϣ��<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Employ\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	getInputlist();
	showForm("#Operate","#fade");
};

var getInputlist=function(){
	var arrArea = ["����","�Ϻ�","����","����","����","֣��","����"];
	var arrPos = ["iOS��������ʦ","Android����ʦ","Cocos��Ϸ��������ʦ","Unity-3D��������ʦ"];
	var html_area=html_pos='<ul style="padding-left:4px;">';
	$.each(arrArea, function(key, val) {
		html_area+='<li onmousedown=InputEmpString(\"Dodate2\","'+val+'");>'+val+'</li>';
	});html_area+='</ul>';
	$.each(arrPos, function(key, val) {
		html_pos+='<li onmousedown=InputEmpString("OperateCommentB","'+val+'");>'+val+'</li>';
	});html_pos+='</ul>';
	$("#emparea").html(html_area);
	$("#emppos").html(html_pos);
};

var InputEmpString=function(i,c){
	$("#"+i).attr("value",c);
};

var showAndHide=function(obj,types){
  switch(types){
    case "show":
    $("#"+obj).show();
    break;
    case "hide":
    $("#"+obj).hide();
    break;
  }
};

var ReEmploy=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>��ְ�Ǽǣ�</li>';
	htmlOperate+='<hr><li style="text-align:left;">�¹�˾��<input id="String" type="text" size="20" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;"><div style="float:left; display:inline;width:180px;">��ְ������<input id="Dodate2" type="text" size="12" onfocus="showAndHide(\'emparea\',\'show\');" onblur="showAndHide(\'emparea\',\'hide\');"/>';
	htmlOperate+='<div id="emparea" style="position:absolute;left:81px;width:100px;height:atuo; z-index:9999; background: #FFF; border:1px solid #999; margin-top:0px;display:none;"></div>';
	htmlOperate+='</div>';
	htmlOperate+='<div>ְλ��<input id="OperateCommentB" type="text" size="20" onfocus="showAndHide(\'emppos\',\'show\');" onblur="showAndHide(\'emppos\',\'hide\');"/>';
	htmlOperate+='<div id="emppos" style="position:absolute;left:238px;width:145px;height:atuo; z-index:9999; background: #FFF; border:1px solid #999; margin-top:0px;display:none;"></div>';
	htmlOperate+='</div>';
	htmlOperate+='</li>';	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ְ���ڣ�<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ְ��н��<input id="Fee" type="text" size="12" /><label style="padding-left:15px;">����н�ʣ�<input id="OperateCommentA" type="text" size="12" /><span style="color:#999;">��û�пɲ��</span></label></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��Ϣ��<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'ReEmploy\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	getInputlist();
	showForm("#Operate","#fade");
};

var RePasswd=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;">����<span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>��½���룺</li>';
	htmlOperate+='<hr><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:80%; height: 28px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'RePasswd\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var SEdit=function(i){
	showForm("#newinput","#fade");
	$("#tel").attr("value","");
	$("#im").attr("value","");
	$("#emergname").attr("value","");
	$("#emergtel").attr("value","");
	$("#college").attr("value","");
	$("#prof").attr("value","");
	$("#refer").attr("value","");
	$("#creditID").attr("value","");
	$("#submitedit").attr("value","�޸�");
	suid=i;
	GetStuInputSels(suid);
};

var showTeachDetailList=function(i){
	$("#teachlistthead").html("");
	$("#teachlisttbody").html("");
	$("#teachlisttfooter").html("");
	$("#TeachlistTitle").html("");
	showForm("#teachlist","#fade2");
	var requests={"question":"ShowTeachList","class":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OperateTeachloading").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmlteachlisttitle='';
			var htmlteachlistthead='';
			var htmlteachlisttbody='';
			var htmlteachlisttfooter='';
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#OperateTeachloading").html("");
				htmlteachlisttitle='<span style="color:blue;font-size:15px;">'+$(ans).find("className").text()+'</span>'+($(ans).find("classAdviser").text()==''?'':'<span style="font-size:12px;"> ְҵ�滮ʦ��'+$(ans).find("classAdviser").text()+'</span>')+'<span style="color:#FAAC58;font-size:12px;">��'+$(ans).find("classOpen").text()+'��</span>';
				if(0<$(ans).find("course").size()){
					htmlteachlisttitle+='<span style="font-size:13px;">��ʦ >> </span>';
					$(ans).find("course").each(function(){
						var courseid=$(this).attr("id");
						htmlteachlisttitle+='<span style="font-weight:bold;font-size:13px;">'+$(this).find("cname").text()+'��</span>'+($(this).find("cteacher").text()==""?'<span style="color:#C0C0C0">δ����</span>':'<span style="color:#666">'+$(this).find("cteacher").text()+'</span>')+'&nbsp;&nbsp;&nbsp;&nbsp;';
					});htmlteachlisttitle+=' <input name="cancel" onclick="CloseWStulist(\'teachlist\');" type="button" value="�ر�" />';
				}
				var teachlisttotal=$(ans).find("answer").attr("all");
				if(0==teachlisttotal){
					htmlteachlistthead+='<tr>';
					htmlteachlistthead+='<th width="100%"><span style="color:#FF0000">��ѧԱ��¼</span></th>';
					htmlteachlistthead+='</tr>';
				}else{
					htmlteachlistthead+='<tr>';
					htmlteachlistthead+='<th width="5%">ѧ��</th>';
					htmlteachlistthead+='<th width="26%" style="text-align:left;padding-left:15px;">����</th>';
					htmlteachlistthead+='<th width="10%">״̬</th>';
					htmlteachlistthead+='<th width="10%">�绰</th>';
					htmlteachlistthead+='<th width="5%">QQ</th>';
					htmlteachlistthead+='<th width="8%">��ϸ����</th>';
					htmlteachlistthead+='<th width="8%">��ѧ��̸��¼</th>';
					htmlteachlistthead+='<th width="8%">���Գɼ�</th>';
					htmlteachlistthead+='</tr>';
					$(ans).find("data").each(function(){
						var scolorN='';
						var statN=$(this).find("statN").text();
						if(statN==1000)scolorN="Green";if(statN==1100)scolorN="#CCC";if(statN==1101)scolorN="#999";if(statN==1200)scolorN="#610B0B";if(statN==1300)scolorN="#DF7401";if(statN==1400)scolorN="#086A87";if(statN==1500)scolorN="#2E9AFE";if(statN==1600)scolorN="#6E6E6E";
						var dataid=$(this).attr("id");
						var isdmail=$(this).find("edflag").text();
						var edflag='<span style="color:#ff0000;font-size:12px;text-decoration:none;" class="tooltip" title="δ���Ϳ����ʼ�">@</span>'; 
						if(1==isdmail)edflag='<span style="color:#6CC417;font-size:12px;text-decoration:none;" class="tooltip" title="�ѷ��Ϳ����ʼ�">@</span>';
						htmlteachlisttbody+="<tr>";
						htmlteachlisttbody+="<td>"+$(this).find("snumber").text()+"</td>";
						htmlteachlisttbody+="<td style='text-align:left;'><span style='font-weight:bold;' id='liststudent"+dataid+"'>"+$(this).find("sname").text()+"</span>"+($(this).find("sname").text().length==2?"��":"")+"("+$(this).find("ssex").text()+")";
						$(this).find("op0").children().each(function(idx,ele){
							if($(ele)[0].tagName=="AddRule")htmlteachlisttbody+= '<font class="op"> <a style="color:#fff;text-decoration:none;background-color:#666;" href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
							if($(ele)[0].tagName=="SendtoEmail"&&0==isdmail)htmlteachlisttbody+= '<font class="op"> <a style="color:#fff;text-decoration:none;background-color:#4863A0;" href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
							else if($(ele)[0].tagName!='Sdevice')htmlteachlisttbody+= '<font class="op"> <a href="javascript:void(0);" onclick="'+$(ele)[0].tagName+'('+dataid+');" class="tooltip" title="'+$(ele).text()+'">'+$(ele).text()+'</a></font>';
						});
						htmlteachlisttbody+='<label id="appendsuggess'+dataid+'"';
						for(var k=0;k < $(this).find("stars").text();k++){
							htmlteachlisttbody+='<span style="color:#99CCFF;margin-left:3px;" title="������('+(k+1)+')�ν׶��ܽ�">��</span>';
						};htmlteachlisttbody+='</label>';
						if(0<$(this).find("mockstar").text())htmlteachlisttbody+=' <span class="tooltip" style="color:'+(statN==1600?'#FF9900':'#ff0000')+';" title="ģ������δͨ��">��</span>';
						htmlteachlisttbody+='</td>';
						htmlteachlisttbody+="<td><span style='color:"+scolorN+"'>"+$(this).find("sstatus").text()+"</span>"+(1000==$(this).find("Noemp").text()&&1600==statN?'<span style="color:#999;font-size:8pt;">������������ҵ��</span>':(1000==$(this).find("Noemp").text()&&1300==statN?'<span style="color:#999;font-size:8pt;">����������ҵ��</span>':""))+" "+edflag+"</td>";
						htmlteachlisttbody+="<td>"+$(this).find("stel").text()+"</td>";
						htmlteachlisttbody+="<td>"+$(this).find("sqq").text()+"</td>";
						htmlteachlisttbody+='<td id="tdplus1'+dataid+'" class="tdplus'+dataid+'"><a href="javascript:void(0);" style="text-decoration: none;" onclick="DetailAllList('+dataid+');">[<span id="plus1'+dataid+'" class="plus'+dataid+'">+</span>]</a></td>';
						var entrancecount=$(this).find("senum").text()==0?'<span style="color:red">�޼�¼</span>':'<span id="loadzhan0'+dataid+'"></span><span style="color:green">'+$(this).find("senum").text()+'�˼�¼</span> <a href="javascript:void(0);" style="text-decoration: none;" onclick="entranceList('+dataid+');">[<span id="plus0'+dataid+'" class="plus'+dataid+'">+</span>]</a>';
						htmlteachlisttbody+='<td id="tdplus0'+dataid+'" class="tdplus'+dataid+'">'+entrancecount+'</td>';
						var examresultcount=$(this).find("sxnum").text()==0?'<span style="color:red">��</span>':'<span id="loadzhan2'+dataid+'"></span><span style="color:green">'+$(this).find("sxnum").text()+'�Ž���</span> <a href="javascript:void(0);" style="text-decoration: none;" onclick="TestResultList('+dataid+');">[<span id="plus2'+dataid+'" class="plus'+dataid+'">+</span>]</a>';
						htmlteachlisttbody+='<td id="tdplus2'+dataid+'" class="tdplus'+dataid+'">'+examresultcount+'</td>';
						htmlteachlisttbody+="</tr>";
						htmlteachlisttbody+='<tr id="zhan0'+dataid+'" class="zhan'+dataid+'" style="display:none;"><td colspan="8" style="background-color:#FFF">';
						htmlteachlisttbody+='<label id="subzhan0'+dataid+'"></label>';
						htmlteachlisttbody+='</td></tr>';
						htmlteachlisttbody+='<tr id="zhan1'+dataid+'" class="zhan'+dataid+'" style="display:none;"><td colspan="8" style="background-color:#FFF;">';
						htmlteachlisttbody+='<label id="subzhan1'+dataid+'"><table width="100%" cellpadding="0" cellspacing="1" style="border:0px;"><tr><th width="8%" style="background-color:#E0F6FF;font-weight:bold;">��Դ</th><th width="15%" style="background-color:#E0F6FF;font-weight:bold;">֤������</th><th width="8%" style="background-color:#E0F6FF;font-weight:bold;">��ѯ����</th><th width="8%" style="background-color:#E0F6FF;font-weight:bold;">�ɷѷ�ʽ</th><th width="5%" style="background-color:#E0F6FF;font-weight:bold;">����</th><th width="6%" style="background-color:#E0F6FF;font-weight:bold;">ѧ��</th><th width="14%" style="background-color:#E0F6FF;font-weight:bold;">ԺУ</th><th width="11%" style="background-color:#E0F6FF;font-weight:bold;">רҵ</th><th width="6%" style="background-color:#E0F6FF;font-weight:bold;">��ҵ����</th><th width="11%" style="background-color:#E0F6FF;font-weight:bold;">������ϵ��</th><th width="11%" style="background-color:#E0F6FF;font-weight:bold;">�绰</th></tr><tr style="line-height:18px;"><td style="background-color:#E0F6FF;">'+$(this).find("sstyle").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("screditcard").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("sconsult").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("sfeeway").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("sarea").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("seducate").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("scollege").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("sprof").text()+'</td><td style="background-color:#E0F6FF;">'+($(this).find("sgraduate").text()=="-"?$(this).find("sgraduate").text():$(this).find("sgraduate").text()+'��')+'</td><td style="background-color:#E0F6FF;">'+$(this).find("semergname").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("semergmdn").text()+'</td></tr><tr><td colspan="11"><hr></td></tr></table></label>';
						htmlteachlisttbody+='</td></tr>';
						htmlteachlisttbody+='<tr id="zhan2'+dataid+'" class="zhan'+dataid+'" style="display:none;"><td colspan="8" style="background-color:#FFF">';
						htmlteachlisttbody+='<label id="subzhan2'+dataid+'" style="background-color:#E0F6FF;"></label>';
						htmlteachlisttbody+='</td></tr>';
						htmlteachlisttbody+='<tr class="zhan'+dataid+'" style="display:none;"><td colspan="8" style="background-color:#FFF"></td></tr>';
					});
				}
				htmlteachlisttfooter+="�� "+teachlisttotal+" ����¼";
			}
			$("#TeachlistTitle").html(htmlteachlisttitle);
			$("#teachlistthead").html(htmlteachlistthead);
			$("#teachlisttbody").html(htmlteachlisttbody);
			$("#teachlisttfooter").html(htmlteachlisttfooter);
			if(""!=htmlteachlisttbody){
				senfe("teachlisttbody","#FFF","#eee","","");
			}
		},
		complete:function(){
		}
	});
};

var AddRule=function(i){
	showForm("#rules","#fade");
	var requests={"question":"GetRulesPanel","sid":i};
	var htmldata="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#rules").html(htmlimgo+'[<a href="javascript:void(0);" onclick="CloseW(\'rules\');">�ر�</a>]');
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
				hideForm("#rules","#fade");
			}
			if(1==err){
				suid=i;
				var isact="";
				var ruleshtml='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+($("#studentName"+i).text()==''?$("#liststudent"+i).text():$("#studentName"+i).text())+'</span>Υ�ͼ�¼��<div style="float:right;"><span style="font-size:14px;"> [ <a href="javascript:void(0);" onclick="CloseW(\'rules\');">�ر�</a> ] </span></div></li><hr style="border:1px dashed #ccc;">';
				if(0<$(ans).find("dayoff").size()){
					ruleshtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC6633;border-radius:4px;">���ټ�¼��</span></li>';
					ruleshtml+='<li style="font-weight:bold;">>>> ���١�'+$(ans).find("dayoff").attr("count")+'���Σ��ۼơ�'+(parseInt($(ans).find("dayoff").attr("limit"))<parseInt($(ans).find("dayoff").attr("length"))?'<span style="color:red;">'+$(ans).find("dayoff").attr("length")+'</span>':$(ans).find("dayoff").attr("length"))+'��Сʱ</li>';
					if(0<$(ans).find("dayofflists").size()){
						$(ans).find("dayofflists").each(function(){
							ruleshtml+='<li>'+$(this).attr("ddate")+'��'+$(this).attr("length")+'��Сʱ��'+$(this).attr("user")+'��>>> '+$(this).attr("comm")+'</li>'
						});
					}ruleshtml+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("studycredit").size()){
					var colorCreditA=colorCreditD='#00BFFF';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					ruleshtml+='<li><span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditA+';border-radius:4px;">���� '+creditA+'</span> <span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditD+';border-radius:4px;">���� '+creditD+'</span></li><hr style="border:1px dashed #ccc;">';
				}
				var nowDate = new Date();
				var dmonth=nowDate.getMonth() + 1;dmonth = dmonth < 10 ? ("0" + dmonth) : dmonth;
				var dday=nowDate.getDate();dday=dday < 10? ("0" + dday) : dday;
				var str = nowDate.getFullYear()+"-"+dmonth+"-"+dday;
				if(0<$(ans).find("rules").size()){
					ruleshtml+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#ff0000;border-radius:4px;">����Υ�ͣ�</span></li>';
					var htmlrulelists='';
					$(ans).find("rules").each(function(){
						htmlrulelists+='<li><span>'+$(this).find("rtime").text()+'</span> >>> <span style="color:#FE642E;font-weight:bold;">'+$(this).find("rname").text()+'��</span><span style="color:#00b6cf;">��'+$(this).find("ruledate").text()+'��</span>'+$(this).find("rcomment").text()+'</li>';
					});ruleshtml+=htmlrulelists;
					ruleshtml+='<hr style="border:1px dashed #ccc;">';
				}
				ruleshtml+='<li style="text-align:left;height:30px;font-size:14px;color:#FF9933;font-weight:bold;margin-top:14px;">����Υ�����ڣ�<input class="Wdate" id="Ruledate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+str+'" /> <input id="showTimeSect" type="checkbox" onclick="sprTimeSect();" />ʱ���� <span id="TimeSect" style="display:none;">��<select id="TimeStart"><option value="0:00">0:00</option><option value="1:00">1:00</option><option value="2:00">2:00</option><option value="3:00">3:00</option><option value="4:00">4:00</option><option value="5:00">5:00</option><option value="6:00">6:00</option><option value="7:00">7:00</option><option value="8:00">8:00</option><option value="9:00">9:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option><option value="23:00">23:00</option></select>����<select id="TimeEnd"><option value="0:00">0:00</option><option value="1:00">1:00</option><option value="2:00">2:00</option><option value="3:00">3:00</option><option value="4:00">4:00</option><option value="5:00">5:00</option><option value="6:00">6:00</option><option value="7:00">7:00</option><option value="8:00">8:00</option><option value="9:00">9:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option><option value="23:00">23:00</option></select>��</span></li>';
				ruleshtml+='<div id="student1">';
				ruleshtml+='<ul id="student1-list">';
				$(ans).find("data").each(function(){
					isact=(1==$(this).attr("id"))?'class="active"':'';
					ruleshtml+='<li id="list'+$(this).attr("id")+'" '+isact+'>'+$(this).attr("name")+'</li>';
				});ruleshtml+='</ul>';
				$(ans).find("data").each(function(){
					ruleshtml+='<div>';
					$(this).find("rule").each(function(){
						if(0<$(this).find("rlist").size())ruleshtml+='<label><input type="radio" name="rule" value="'+$(this).find("rlist").attr("rcredit")+'|'+$(this).attr("rname")+'">'+$(this).attr("rname")+'</label>';
						else if(0<$(this).find("vlist").size()){
							ruleshtml+='<br/>'+$(this).attr("rname")+' >>> ';
							$(this).find("vlist").each(function(){
								ruleshtml+='<label><input type="radio" name="rule" value="'+$(this).attr("Vcredit")+'|'+$(this).parent().attr("rname")+'��'+$(this).attr("vName")+'">'+$(this).attr("vName")+'</label>';
							});
						}
					});ruleshtml+='</div>';
				});
				ruleshtml+='</div>';
				ruleshtml+='<div id="student1-submit" style="width:100%; background:#ececec; height:70px; line-height:70px; margin:0px auto; padding:0; position:relative;border:2px solid #ececec;"><span style="margin-left:10px;">��ע��</span><textarea id="comment" style="width:80%;resize:none;overflow:auto; height:30px; line-height:18px; vertical-align:middle; font-size:14px;"></textarea><input type="submit" id="submit1" style="width:10%; height:35px; font-size:14px; font-weight:bold; outline:none; margin-left:10px; position:absolute;right:15px; top:17px;" value="�� ��" onclick="submitRules();" /></div> <span id="ruleloading" style="color:red;"></span>';
				ruleshtml+='<span style="color:#999;">ע������80�֣��������Ϻϸ���60-79���棬60�����²����񣻼���80�֣��������Ϻϸ���60-69���棬60�����²�������</span><hr style="border:1px dashed #ccc;">';
				ruleshtml+='<script>';
				ruleshtml+='var oStudent1 = document.getElementById("student1");';
				ruleshtml+='var sLi = oStudent1.getElementsByTagName("li");';
				ruleshtml+='var sDiv = oStudent1.getElementsByTagName("div");';
				ruleshtml+='var sRadio=document.getElementsByName("rule");';
				ruleshtml+='sDiv[0].style.display="block";';
				ruleshtml+='for(var i=0; i<sLi.length; i++){';
				ruleshtml+='sLi[i].index = i;';
				ruleshtml+='sLi[i].onclick = function(){';
				ruleshtml+='for(var i=0; i<sDiv.length; i++){';
				ruleshtml+='sLi[i].className ="";';
				ruleshtml+='sDiv[i].style.display="none";';
				ruleshtml+='}';
				ruleshtml+='$("input[name=rule]").attr("checked",false);';
				ruleshtml+='this.className ="active";';
				ruleshtml+='sDiv[this.index].style.display="block";';
				ruleshtml+='};';
				ruleshtml+='};';
				ruleshtml+='</script>';
				$("#rules").html(ruleshtml);
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#rules");
		}
	});
};

var sprTimeSect=function(){
	if($("#showTimeSect").is(':checked'))$("#TimeSect").show();
	else $("#TimeSect").hide();
};

var submitRules=function(){
	var selectList;
	var content=$("input[name=rule]:checked").val();
	var comment=$("#comment").val();
	var ruleDate=$("#Ruledate").val();
	var TimeSect="";
	if($("#showTimeSect").is(':checked')){
		TimeSect=$("#TimeStart").val()+'-'+$("#TimeEnd").val();
	}
	$("#student1-list").find("li").each(function(){
		if($(this).attr("class")=="active")selectList=$(this).attr("id").substring(4);
	});
	var requests={"question":"StudentOperation","type":"AddRule","suid":suid,"did":selectList,"s":content,"comment":comment,"as":ruleDate,"ab":TimeSect};
	var htmldata="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#ruleloading").html(htmlimgo);
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
				$("#ruleloading").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#ruleloading").html("");
				hideForm("#rules","#fade");
			}
		},
		complete:function(){
		}
	});
};

var entranceList=function(i){
	if($("#zhan0"+i).is(":hidden")){
		$(".zhan"+i).hide();
		$("#zhan0"+i).show();
		$(".plus"+i).html("+");
		$("#plus0"+i).html(" - ");
		$(".tdplus"+i).css("background-color","");
		$("#tdplus0"+i).css("background-color","#E0F6FF");
		var requests={"question":"GetEntranceList","suid":i};
		$.ajax({
			type:'POST',
			url:doUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
				$("#loadzhan0"+i).html(htmlimgo);
			},
			error:function(e){
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(1==err){
					$("#loadzhan0"+i).html("");
					var htmlentrancelist='<table width="100%" cellpadding="0" cellspacing="1" style="border:0px;"><tr><th width="5%" style="background-color:#E0F6FF;"></th><th colspan="7" style="background-color:#E0F6FF;font-weight:bold;line-height:18px;">��ҵ����</th><th colspan="4" style="background-color:#E0F6FF;font-weight:bold;line-height:18px;">��������</th></tr>';
					htmlentrancelist+='<tr style="line-height:18px;"><td style="background-color:#E0F6FF;font-weight:bold;">��¼��</td><td style="background-color:#E0F6FF;font-weight:bold;">�Ը�</td><td style="background-color:#E0F6FF;font-weight:bold;">��ͨ����</td><td style="background-color:#E0F6FF;font-weight:bold;">��̬</td><td style="background-color:#E0F6FF;font-weight:bold;">��ҵ�뷨</td><td style="background-color:#E0F6FF;font-weight:bold;">֮ǰ����</td><td style="background-color:#E0F6FF;font-weight:bold;">���۽���</td><td style="background-color:#E0F6FF;font-weight:bold;">��ע</td><td style="background-color:#E0F6FF;font-weight:bold;">��������</td><td style="background-color:#E0F6FF;font-weight:bold;">��������</td><td style="background-color:#E0F6FF;font-weight:bold;">���۽���</td><td style="background-color:#E0F6FF;font-weight:bold;">��ע</td></tr>';
					$(ans).find("data").each(function(){
						htmlentrancelist+='<tr style="line-height:18px;"><td style="background-color:#E0F6FF;">'+$(this).find("uname").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("character").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("communicate").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("mentality").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("thought").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("experience").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("suggest_S").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("comment_S").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("language").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("project").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("suggest_T").text()+'</td><td style="background-color:#E0F6FF;">'+$(this).find("comment_T").text()+'</td></tr>';
					});
					htmlentrancelist+='<tr><td colspan="12"><hr></td></tr></table>';
					$("#subzhan0"+i).html(htmlentrancelist);
				}
			},
			complete:function(){
			}
		});	
	}else{
		$(".zhan"+i).hide();
		$(".plus"+i).html("+");
		$(".tdplus"+i).css("background-color","");
		$("#loadzhan0"+i).html("");
	}
};

var DetailAllList=function(i){
	if($("#zhan1"+i).is(":hidden")){
		$(".zhan"+i).hide();
		$("#zhan1"+i).show();
		$(".plus"+i).html("+");
		$("#plus1"+i).html(" - ");
		$(".tdplus"+i).css("background-color","");
		$("#tdplus1"+i).css("background-color","#E0F6FF");
	}else{
		$(".zhan"+i).hide();
		$(".plus"+i).html("+");
		$(".tdplus"+i).css("background-color","");
	}
};

var TestResultList=function(i){
	if($("#zhan2"+i).is(":hidden")){
		$(".zhan"+i).hide();
		$("#zhan2"+i).show();
		$(".plus"+i).html("+");
		$("#plus2"+i).html(" - ");
		$(".tdplus"+i).css("background-color","");
		$("#tdplus2"+i).css("background-color","#E0F6FF");
		var requests={"question":"GetExamResultList","suid":i};
		$.ajax({
			type:'POST',
			url:doUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
				$("#loadzhan2"+i).html(htmlimgo);
			},
			error:function(e){
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(1==err){
					$("#loadzhan2"+i).html("");
					var htmlexamresultlist='<table width="100%" cellpadding="0" cellspacing="1" style="border:0px;"><tr><td width="100%" style="background-color:#E0F6FF;text-align:right;padding-right:15px;">';
					$(ans).find("data").each(function(){
						htmlexamresultlist+='�� <span style="font-weight:bold;">'+$(this).find("ename").text()+'</span>��<span style="color:blue;padding-right:25px;">'+$(this).find("result").text()+'</span>';
					});
					htmlexamresultlist+='</td></tr><tr><td><hr></td></tr></table>';
					$("#subzhan2"+i).html(htmlexamresultlist);
				}
			},
			complete:function(){
			}
		});	
	}else{
		$(".zhan"+i).hide();
		$(".plus"+i).html("+");
		$(".tdplus"+i).css("background-color","");
		$("#loadzhan2"+i).html("");
	}
};

var GotoLearnInterv=function(i){
	hideForm("#Details","#fade");
	Sinterv(i);
};

var Sinterv=function(i){
	suid=i;
	$("#Icharacter").attr("value","");
	$("#Icommunicate").attr("value","");
	$("#Imentality").attr("value","");
	$("#Ithought").attr("value","");
	$("#Iexperience").attr("value","");
	$("#IsuggestS").attr("value","");
	$("#IcommentS").attr("value","");
	$("#Iscollege").attr("value","");
	$("#Isprof").attr("value","");
	$("#Ilanguage").attr("value","");
	$("#Iproject").attr("value","");
	$("#IsuggestT").attr("value","");
	$("#IcommentT").attr("value","");
	GetStudentInterVDetail("SDetail");
	showForm("#intervinput","#fade");
	$("#tel").attr("value","");
	$("#im").attr("value","");
	$("#emergname").attr("value","");
	$("#emergtel").attr("value","");
	$("#college").attr("value","");
	$("#prof").attr("value","");
	$("#refer").attr("value","");
	$("#creditID").attr("value","");
	$("#submitedit").attr("value","�޸�");
	suid=i;
	GetStuInputSels(suid);
};

var GetStudentInterVDetail=function(t){
	var requests={"question":"GetStudentDetails","type":t,"suid":suid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#ldetails").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#ldetails").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">��ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span>��';
				var sclass=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">�༶��</span>'+$(ans).find("class").text()+'��';
				var cname=$(ans).find("name").text()==""?"":'<span style="font-weight:bold;">������</span><span style="font-weight:bold;color:blue;">'+$(ans).find("name").text()+'</span>��';
				var snumber=$(ans).find("snumber").text()==""?"":'<span style="font-weight:bold;">ѧ�ţ�</span>'+$(ans).find("snumber").text()+'��';
				var csex=$(ans).find("sex").text()==""?"":'<span style="font-weight:bold;">�Ա���</span>'+$(ans).find("sex").text()+'��';
				var ctel=$(ans).find("tel").text()==""?"":'<span style="font-weight:bold;">�绰��</span>'+$(ans).find("tel").text()+'��';
				var cim=$(ans).find("im").text()==""?"":'<span style="font-weight:bold;">QQ��</span>'+$(ans).find("im").text()+'��';
				var cemergname=$(ans).find("semergname").text()==""?"":'<span style="font-weight:bold;">������ϵ�ˣ�</span>'+$(ans).find("semergname").text()+'��';
				var cemergtel=$(ans).find("semergtel").text()==""?"":'<span style="font-weight:bold;">��ϵ�˵绰��</span>'+$(ans).find("semergtel").text()+'��';
				var cstyle=$(ans).find("style").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">��ѯ��ʽ��</span>'+$(ans).find("style").text()+'��';
				var ctender=$(ans).find("tender").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ѧ������</span>'+$(ans).find("tender").text()+'��';
				var cfoundate=$(ans).find("foundate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">������</span>'+$(ans).find("foundate").text()+'��';
				var ceducate=$(ans).find("educate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">ѧ����</span>'+$(ans).find("educate").text()+'��';
				var ccollege=$(ans).find("college").text()==""?"":'<span style="font-weight:bold;">��ҵԺУ��</span>'+$(ans).find("college").text()+'��';
				var cprof=$(ans).find("prof").text()==""?"":'<span style="font-weight:bold;">��ѧרҵ��</span>'+$(ans).find("prof").text()+'��';
				var carea=$(ans).find("area").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">������</span>'+$(ans).find("area").text()+'��';
				var ccurrent=$(ans).find("current").text()=="��ѡ��"?"":'<span style="font-weight:bold;">Ŀǰ״����</span>'+$(ans).find("current").text()+'��';
				var cfrom=$(ans).find("from").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��Դ��</span>'+$(ans).find("from").text()+'��';
				var ckeyword=$(ans).find("keyword").text()==""?"":'<span style="font-weight:bold;">�����ؼ��ʣ�</span>'+$(ans).find("keyword").text()+'��';
				var crefer=$(ans).find("refer").text()==""?"":'<br /><span style="font-weight:bold;">�����ˣ�</span>'+$(ans).find("refer").text()+'��';
				var ccomment=$(ans).find("comment").text()==""?"":'<br /><span style="font-weight:bold;">��ѯҪ�㣺</span>'+$(ans).find("comment").text()+'��';
				var ccreditid=$(ans).find("creditid").text()==""?"":'<span style="font-weight:bold;">֤�����룺</span>'+$(ans).find("creditid").text()+'��';
				var cfeeway=$(ans).find("feeway").text()=="��ѡ��"?"":'<span style="font-weight:bold;">�ɿ���ʽ��</span>'+$(ans).find("feeway").text()+'��';
				var cgraduate=$(ans).find("graduate").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ҵ���ݣ�</span>'+$(ans).find("graduate").text()+'�ꣻ';
				var htmldetails="";
				htmldetails+='<div>'+cname+sclass+'<br />'+stat+snumber+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;">';
				htmldetails+='<div>'+csex+ctel+cim+cemergname+cemergtel+cfoundate+ceducate+ccollege+cprof+carea+ccurrent+cgraduate+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				htmldetails+='<li>'+ccreditid+cfeeway+'</li>';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				}
				htmldetails+='</ul>';
				if(0<$(ans).find("resexam").size()){
					htmldetails+='<li style="font-weight:bold;">���Խ�����<li/>';
					var htmlexamAlist="";
					var htmlexamlist='<li>';
					$(ans).find("resexam").each(function(){
						if(""!=$(this).find("exp").text()){
							htmlexamlist+='<label style="margin-right:10px;font-size:15px;"><span style="color:blue;">'+$(this).find("ename").text()+'��</span><span style="color:#DF7401;font-weight:bold;">'+$(this).find("result").text()+'</span>��ѡ���жϣ���</label>';
							htmlexamlist+='<li>�ʴ��� >>> <input id="checkqna" type="button" value=" �鿴��Ŀ���ο����� " onclick="showListQna();" /><li/>';
							var strs= new Array();
							var strs=$(this).find("eAnswer").text().split("[|]");
							for(var z=0;z<strs.length ;z++ ) 
							{ 
								htmlexamlist+=z+1+"��"+(strs[z]==''?"<span style='color:red;'>δ����</span>":strs[z])+"<br/>";
							}
							htmlexamAlist+='<ul id="questionAll" style="display:none;background-color:#FFF;"><hr style="border:1px dashed #ccc;">';
							var strsq= new Array();
							var strsq=$.base64({data:$(this).find("exp").text(),type:1}).split("[|]");
							for(var q=0;q<strsq.length ;q++ ) 
							{ 
								htmlexamAlist+="<strong>"+(q+1)+"</strong>��"+strsq[q]+"<br/>";
							}
							htmlexamAlist+='</ul>';
						}else htmlexamlist+='<label style="margin-right:10px;line-height:25px;">�� <span style="color:blue;">'+$(this).find("ename").text()+'��</span><span style="color:#DF7401;font-weight:bold;">'+$(this).find("result").text()+'</span>��ѡ���жϣ���</label>';
					});
					htmlexamlist+='</li>';
					htmldetails+=htmlexamlist+htmlexamAlist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}else htmldetails+='<li><span style="color:#FF0000;">��ѧԱ��û�н�����ѧ���ԣ�</span></li>';
				$("#ldetails").html(htmldetails);
				$("#Iscollege").attr("value",$(ans).find("college").text());
				$("#Isprof").attr("value",$(ans).find("prof").text());
				if(0<$(ans).find("interv").size()){
					$("#Icharacter").attr("value",$(ans).find("interv").attr("character"));
					$("#Icommunicate").attr("value",$(ans).find("interv").attr("communicate"));
					$("#Imentality").attr("value",$(ans).find("interv").attr("mentality"));
					$("#Ithought").attr("value",$(ans).find("interv").attr("thought"));
					$("#Iexperience").attr("value",$(ans).find("interv").attr("experience"));
					$("#IsuggestS").attr("value",$(ans).find("interv").attr("suggest_s"));
					$("#IcommentS").attr("value",$(ans).find("interv").attr("comment_s"));
					$("#Ilanguage").attr("value",$(ans).find("interv").attr("language"));
					$("#Iproject").attr("value",$(ans).find("interv").attr("project"));
					$("#IsuggestT").attr("value",$(ans).find("interv").attr("suggest_t"));
					$("#IcommentT").attr("value",$(ans).find("interv").attr("comment_t"));
				}
			}
		},
		complete:function(){
		}
	});
};

var showListQna=function(){
	if($("#questionAll").css("display")=='none'){
		$("#checkqna").attr("value"," ������Ŀ���ο����� - ");
		$("#questionAll").show();
	}else{
		$("#checkqna").attr("value"," �鿴��Ŀ���ο����� + ");
		$("#questionAll").hide();
	}JudgeWindowSizetoCss("#intervinput");
};

var GetStuInputSels=function(i){
	var requests={"question":"GetStuInputSel","sid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				alert("err");
			}
			if(1==err){
				cuid=i;
				$("#inptip").html("");
				var htmlinpsel;
				$(ans).find("answer").children().each(function(idx0,ele0){
					htmlinpsel="";
					$(ans).find($(ele0)[0].tagName).each(function(){
						if("input"!=$(ele0)[0].tagName){
							$(this).find("option").each(function(idx,ele){
								if("1"==$(ele).attr("sel")){
									htmlinpsel+='<option value="'+$(ele).attr("id")+'" selected>'+$(ele).attr("name")+'</option>';
								}else{
									htmlinpsel+='<option value="'+$(ele).attr("id")+'">'+$(ele).attr("name")+'</option>';
								}
							});
						}else{
							$(ans).find($(ele0)[0].tagName).children().each(function(idx1,ele1){
								$("#"+$(ele1)[0].tagName).attr("value",$(this).text());
							});
						}
					});
					$("#"+$(ele0)[0].tagName).html(htmlinpsel);
				});
			}
		},
		complete:function(){
		}
	});
};

var SubStuInput=function(){
	var substuname=$("#stuname").val();
	var subsex=$("#sex").val();
	var subtel=$("#tel").attr("value");
	var subim=$("#im").attr("value");
	var subemergname=$("#emergname").val();
	var subemergtel=$("#emergtel").val();
	var subfoundate=$("#foundate").val();
	var subeducate=$("#educate").val();
	var subcollege=$("#college").attr("value");
	var subprof=$("#prof").attr("value");
	var subarea=$("#inparea").val();
	var subcurrent=$("#current").val();
	var subrefer=$("#refer").attr("value");
	var subcreditID=$("#creditID").attr("value");
	var subfeeway=$("#inpfeeway").val();
	var subgraduate=$("#graduate").val();
	var subjobcredit=$("#jobcredit").attr("value");
	var subjobarea=$("#jobarea").attr("value");
	var subjobxp=$("#jobxp").attr("value");
	var requests={"question":"UpdateStuDatas","id":suid,"stuname":substuname,"sex":subsex,"tel":subtel,"im":subim,"emergname":subemergname,"emergtel":subemergtel,"foundate":subfoundate,"educate":subeducate,"college":subcollege,"prof":subprof,"area":subarea,"current":subcurrent,"refer":subrefer,"creditid":subcreditID,"feeway":subfeeway,"graduate":subgraduate,"jobcredit":subjobcredit,"jobarea":subjobarea,"jobxp":subjobxp};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
			$("#submitedit").attr("disabled",true);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(3000==err){
				alert("err");
			}
			if(2001==err){
				$("#inptip").html($(ans).find("answer").attr("note"));
				$("#submitedit").attr("disabled",false);
			}
			if(1010==err){
				hideForm("#newinput","#fade");
				GetStudentCondition();
				$("#submitedit").attr("disabled",false);
			}
		},
		complete:function(){
		}
	});
};

var SubStuIntervInput=function(t){
	var Icharacter=$("#Icharacter").attr("value");
	var Icommunicate=$("#Icommunicate").attr("value");
	var Imentality=$("#Imentality").attr("value");
	var Ithought=$("#Ithought").attr("value");
	var Iexperience=$("#Iexperience").attr("value");
	var IsuggestS=$("#IsuggestS").attr("value");
	var IcommentS=$("#IcommentS").attr("value");
	var Iscollege=$("#Iscollege").attr("value");
	var Isprof=$("#Isprof").attr("value");
	var Ilanguage=$("#Ilanguage").attr("value");
	var Iproject=$("#Iproject").attr("value");
	var IsuggestT=$("#IsuggestT").attr("value");
	var IcommentT=$("#IcommentT").attr("value");
	var requests={"question":"UpdateStuInterVDatas","id":suid,"Icharacter":Icharacter,"Icommunicate":Icommunicate,"Imentality":Imentality,"Ithought":Ithought,"Iexperience":Iexperience,"IsuggestS":IsuggestS,"IcommentS":IcommentS,"Iscollege":Iscollege,"Isprof":Isprof,"Ilanguage":Ilanguage,"Iproject":Iproject,"IsuggestT":IsuggestT,"IcommentT":IcommentT};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Iinptip").html(htmlimgo);
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
				$("#Iinptip").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#Iinptip").html("");
				GetStudentInterVDetail("SDetail");
				if(t==1){
					hideForm("#intervinput","#fade");
					GetStudentCondition();
				}
			}
		},
		complete:function(){
		}
	});
};

var SubStuInputCommit=function(cat){
	var subcat=cat;
	var subval=$("#"+cat).attr("value");
	var requests={"question":"CustomStuInputCommit","id":suid,"cat":subcat,"val":subval};
	$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#inptip").html(htmlimgo);
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
				$("#inptip").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				$("#inptip").html("");
			}
		},
		complete:function(){
		}
	});
};

var GotoSEdit=function(i){
	hideForm("#Details","#fade");
	SEdit(i);
};

var DropNofee=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>������ѧ��</li>';
	htmlOperate+='<li style="text-align:left;"><span style="color:#DF3A01;">�������벻�˱����ѻ��Ѳ����˷ѣ����ύ������������Ա������������ȷ�Ϻ���Ч�����賷�����ɸ�֪������Ա�ܾ������󣡣�</span></li>';
	htmlOperate+='<hr><li style="text-align:left;">��ѧԭ����<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'DropNofee\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Spause=function(i){
	$("#Operate").html("");
	suid=i;
	var nowDate = new Date();
	var dmonth=nowDate.getMonth() + 1;dmonth = dmonth < 10 ? ("0" + dmonth) : dmonth;
	var dday=nowDate.getDate();dday=dday < 10? ("0" + dday) : dday;
	var str = nowDate.getFullYear()+"-"+dmonth+"-"+dday;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>��ѧ��¼��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ѧ���ڣ��� <input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+str+'" /> �� <input class="Wdate" id="Dodate2" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+str+'" /></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ѧԭ����<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Spause\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var Spcancel=function(i){
	$("#Operate").html("");
	suid=i;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span id="RecoverName" style="font-weight:bold;font-size:14px;"></span>���٣�<hr></li>';
	htmlOperate+='<li style="text-align:left;"><label><input id="OperateCheck" type="checkbox" onclick="javascript:SelpcancelClassSels();"/> ���°��Ű༶</label><div style="display:none;" id="Operatesel"></div></li>';
	htmlOperate+='<li id="sendemail" style="text-align:left;display:none;"><hr style="border:1px dashed #ccc;"><span style="font-weight:bold;font-size:13px;">>>> ����֪ͨ��Email��<input id="String" size=25 value="" style="background:transparent;border:0;border-bottom:1px solid #000;" disabled/></span></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">��ע��<textarea cols="51" id="OperateComment" style="width:60%; height: 28px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Spcancel\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetRecoverClassSels(i);
	showForm("#Operate","#fade");
};

var Sdayoff=function(i){
	$("#Operate").html("");
	suid=i;
	var nowDate = new Date();
	var dmonth=nowDate.getMonth() + 1;dmonth = dmonth < 10 ? ("0" + dmonth) : dmonth;
	var dday=nowDate.getDate();dday=dday < 10? ("0" + dday) : dday;
	var str = nowDate.getFullYear()+"-"+dmonth+"-"+dday;
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#studentName"+i).text()+'</span>���ټ�¼��</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;color:#FFF;background:#00b6cf;border-radius:5px;font-weight:bold;padding-left:5px;">���١�<span id="dayoffcount" />���Σ��ۼơ�<span id="dayofflength" />��Сʱ</li>';
	htmlOperate+='<li id="dayofflist" style="text-align:left;color:#666;padding-left:5px;"/>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">�������ڣ�<input class="Wdate" id="Dodate" type="text" size="12" onclick="WdatePicker();" readonly="readonly" value="'+str+'" /> ʱ����<input id="Dodate2" type="text" size="3" value="0" />Сʱ</li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">����ԭ����<textarea cols="51" id="OperateComment" style="width:80%; height: 30px"></textarea></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toStudentOperate(\'Sdayoff\');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetDayoffdatas(i);
	showForm("#Operate","#fade");
};

var GetDayoffdatas=function(i){
	var requests={"question":"GetDayoffdatas","sid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#dayofflist").html("");
				$("#Operateloading").html("");
				$("#dayoffcount").html($(ans).find("answer").attr("note"));
				$("#dayofflength").html(parseInt($(ans).find("answer").attr("limit"))<parseInt($(ans).find("answer").attr("gopage"))?'<span style="color:red;">'+$(ans).find("answer").attr("gopage")+'</span>':$(ans).find("answer").attr("gopage"));
				if(0<$(ans).find("answer").attr("note")){
					var htmldayofflist='';
					$(ans).find("dayoffs").each(function(){
						htmldayofflist+='<li>'+$(this).attr("ddate")+'��'+$(this).attr("length")+'��Сʱ��'+$(this).attr("user")+'��>>> '+$(this).attr("comm")+' '+(0<$(this).attr("limit")?' <a style="text-decoration:none;color:red;" href="javascript:void(0);" onclick="delDayoff('+$(this).attr("id")+');">[ - ]</a>':'')+'</li>'
					});
				}$("#dayofflist").html(htmldayofflist);
			}
		},
		complete:function(){
		}
	});
};

var delDayoff=function(d){
	var requests={"question":"DelDayoff","did":d,"sid":suid};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				GetDayoffdatas(suid);
			}
		},
		complete:function(){
		}
	});
};

var SelpcancelClassSels=function(){
	if($("#OperateCheck").is(':checked')){
		$("#Operatesel").show();
		$("#sendemail").show();
	}else{
		$("#Operatesel").hide();
		$("#sendemail").hide();
	}JudgeWindowSizetoCss("#Operate");
};

var Sdevice=function(i){
	suid=i;
	$("#device"+i).show();
	GetDeviceSeries(i);
};

var GetDeviceSeries=function(i){
	var requests={"question":"GetDeviceSeries","sid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#dcode"+i).html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#dcode"+i).html("");
				$("#device"+i).attr("value",$(ans).find("answer").attr("note"));
			}
		},
		complete:function(){
		}
	});
};

var GetStudentPositionlist=function(c){
	showForm("#Position","#fade");
	ShowStudentSeated(c);
};

var ShowStudentSeated=function(c){
	var requests={"question":"GetStudentPositionlist","cid":c};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Position").html('���ڼ�����λͼ...'+htmlimgo+' <input type="button" onclick="CloseW(\'Position\');" value="�ر�" />');
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
				$("#Position").html('<script>MoveSeated('+c+','+$(ans).find("answer").attr("gopage")+');</script><div style="float:right;">[ <a href="javascript:void(0);" style="font-size:14px;color:blue;"onclick="CloseW(\'Position\');">�ر�</a> ] </div></li><hr style="border:1px dashed #ccc;">'+$.base64({data:$(ans).find("answer").attr("note"),type:1})+'<div style="float:right;">[ <a href="javascript:void(0);" style="font-size:14px;color:blue;"onclick="CloseW(\'Position\');">�ر�</a> ] </div></li><hr style="border:1px dashed #ccc;"><div style="text-align:center;"><input style="height:25px;font-size:16px;padding:4px 10px 4px 10px;background-color:#9FF781;box-shadow:5px 5px 5px #CCC;" type=button onclick="javascript:window.print();" value=" <<< ��ӡ��λͼ "/></div>');
			}
		},
		complete:function(){
		}
	});
};

var submitStudentSeated=function(c,s,o,d){
	var requests={"question":"submitStudentSeated","cid":c,"sid":s,"oid":o,"did":d};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
			}else{
				ShowStudentSeated(c);
				alert("Ų��ʧ�ܣ��뱣������ͨ�������ԣ�");
			}
		},
		complete:function(){
		}
	});
};

var MoveSeated=function(c,d){
	$("div.student").each(function(){
		initDivCss(this);
	});
	if(0<d){	
		$('div.student').draggable({
			revert:true,//��������Ϊtrue, ���϶�ֹͣʱԪ�ؽ��������ĳ�ʼλ�á�
			deltaX:0,//���϶�Ԫ�ض�Ӧ�ڵ�ǰָ����ˮƽλ�á�
			deltaY:0//���϶�Ԫ�ض�Ӧ�ڵ�ǰָ���Ĵ�ֱλ�á�
		}).droppable({
			onDrop:function(e,source){ //�����϶�Ԫ�ر�����Ŀ�����������õ�ʱ�򴥷�������source�Ǳ��϶���DOMԪ�ء�
				var tempId = $(source).attr("id");//��ʱid�����ű��϶�������id
				var tempHtml = $(source).html();//��ʱhtml�����ű��϶�������html
				var tempColor = $(source).attr("normalColor");//��ʱbackground-color�����ű��϶�������background-color
				var tempBackground = $(source).css("background");//��ʱbackground�����ű��϶�������background
				var tempPositionId = $(source).parent().attr("id");
				$(source).html($(this).html());//����html
				$(source).attr("id",$(this).attr("id"));
				$(this).html(tempHtml);
				$(this).attr("id",tempId);
				initDivCss(this);
				initDivCss(source);
				submitStudentSeated(c,$(this).attr("id"),tempPositionId.replace("name",""),$(this).parent().attr("id").replace("name",""));
			}
		});
	}
};

var initDivCss=function(obj){
	var t = $(obj).html();
	if(t == '' || t == null){
		$(obj).css("background","");
		$(obj).css("background-color","#fff");
		$(obj).attr("normalColor","#fff");
	}else{
		$(obj).css("background","url('images/xinxi2.gif') right top no-repeat");//��̬Ϊÿ��div���ӱ���ͼƬ��spanΪ��
		$(obj).css("background-color","#dfeaed");
		$(obj).attr("normalColor","#dfeaed");
		var newSpan = $("<span class='spn'></span>");
		$(obj).append(newSpan);
		var divWidth =  $(obj).css("width").substring(0,$(obj).css("width").length -2);//��ȡdiv.student�Ŀ���
		var spanWidth = $(newSpan).css("width").substring(0,$(newSpan).css("width").length -2);//��ȡspan�Ŀ���
		var result = divWidth - spanWidth;//����span�Ŀ�ʼ����
		if($.browser.msie){//�ж��������Ƿ�Ϊie
			//��������span����
			result = divWidth - 1 * spanWidth;
		}
		$(newSpan).css("left", result + "px");//����span��λ��
		$(newSpan).css("top","-"+$(obj).css('height'));//����span�ĸ߶�λ��
    $(obj).mousedown(function(){
    	$(obj).css("background-color","#0FA6D8");
    }).mouseup(function(){
    	var m = $(obj).html();
    	if(m == '' || m == null){
    		$(obj).css("background-color",$(obj).attr("normalColor"));
    	}else{
				$(obj).css("background-color",$(obj).attr("normalColor"));
      }
		});
	}
	//��ÿ����ť����tip���¼�
	//tipBind($(obj).find("span"));
};

var tipBind=function(obj){
	$(obj).bind({
		click:function(){
			layer.tips('<div><ul id="ul-list1" style="width:50px;height:auto;"><li class="ul-li">name:<a class="name" >1</a></li><li class="ul-li">ɾ��:<a class="del" href="#">ɾ��</a></li><li class="ul-li">sex:<a href="#">3</a></li><li class="ul-li">hobby:<a href="#">4</a></li></ul></div>', this, {  
				guide: 2,  //  0��    1��   2��    3��   ��дĬ������������
				style: ['background-color:#0FA6D5; color:#fff; opacity:0.7', '#0FA6D8'],//  ������һ��ֵ�����Զ���tips��css��ʽ �������ڶ���ֵ��Ϊ�����ε���ɫ��
				maxWidth:350,
				area: ['auto', 'auto'],
				closeBtn:[0, true]
			});
			$(".a1").click(function(){
				var page = $.layer({
					type: 1,
					title: false,
					area: ['auto', 'auto'],
					border: [0], //ȥ��Ĭ�ϱ߿�
					shade: [0.5, '#000'], //ȥ������shade: [0]���ɡ�ֵ�ֱ��ǣ�[����͸����, ������ɫ, false,true layer1.8֮ǰ���ڴ˴���true] 
					closeBtn: [0, true], //���Ʋ����Ͻǹرհ�ť��closeBtn��ֵ�ֱ�Ϊ: [�رհ�ť�ķ�����֧��0��1��, true]
					shift: 'left', //���󶯻�����      ���ڿ��ƶ���������������ѡ��������(left-top),��(top), ����(right-top),����(right-bottom),��(bottom),����(left-bottom),��('left')��
					page:{
						html: '<div style="width:420px; height:260px; padding:20px; border:1px solid #ccc; background-color:#eee;"><p>�Ҵ������������Զ��˷�����</p><button id="pagebtn" class="btns" onclick="">�ر�</button></div>'
					}
				});
			});
			$(".ul-li").click(function(){
				var page = $.layer({
					type: 1,
					title: false,
					area: ['auto', 'auto'],
					border: [0], //ȥ��Ĭ�ϱ߿�
					shade: [0.5, '#000'], //ȥ������shade: [0]���ɡ�ֵ�ֱ��ǣ�[����͸����, ������ɫ, false,true layer1.8֮ǰ���ڴ˴���true] 
					closeBtn: [0, true], //���Ʋ����Ͻǹرհ�ť��closeBtn��ֵ�ֱ�Ϊ: [�رհ�ť�ķ�����֧��0��1��, true]
					shift: 'left', //���󶯻�����      ���ڿ��ƶ���������������ѡ��������(left-top),��(top), ����(right-top),����(right-bottom),��(bottom),����(left-bottom),��('left')��
					page: {
						html: '<div style="width:420px; height:260px; padding:20px; border:1px solid #ccc; background-color:#eee;"><p>�Ҵ������������Զ��˷�����</p><button id="pagebtn" class="btns" onclick="">�ر�</button></div>'
					}
				});
				$('#pagebtn').on('click', function(){
					layer.close(page);
				});
			});
		}
	});
};

/****************************************************************/
var gotoStaffPage=function(p){
	consultpage=p;
	GetStaffCondition();
};

var changeStaffPage=function(){
	gotoStaffPage($("#changeconsultpage").val());
};

var setStaffLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	GetStaffCondition();
};

var setLimitStaffStatus=function(c){
	consultpage=1;
	LimitStaffstatus=c;
	GetStaffCondition();
	$("#search").val("");
	consultkey="";
};

var displayStaffOrder=function(){
	$("#imgtime").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	if(1==consultorder)$("#img"+StafforderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+StafforderV).attr("src",htmlimgAsc);
	$("#img"+StafforderV).show();
};

var changeStaffOrder=function(v){
	$("#imgtime").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	consultpage=1;
	StafforderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetStaffCondition();
	$("#img"+v).show();
};

var StaffSearcher=function(){
	Limitarea=0;
	LimitStaffstatus="all";
	StafforderV="normal";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeStaffOrder(StafforderV);
};

var GetStaffCondition=function(){
	var requests={"question":"GetStaffConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setStaffLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("status").size()){
					if('all'==LimitStaffstatus){
						html+='<span style="font-weight:bold;">ְλ��</span><a class="active" href="javascript:void(0);" onclick=setLimitStaffStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStaffStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">ְλ��</span><a href="javascript:void(0);" onclick=setLimitStaffStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							if($(this).attr("id")==LimitStaffstatus){
								html+='<a class="active" id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStaffStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitStaffStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
				}
				$("#status").html(html);
			}
		},
		complete:function(){
			getStaffData();
		}
	});
};

var getStaffData=function(){
	var requests={"question":"GetStaffData","key":consultkey,"page":consultpage,'orderV':StafforderV,'order':consultorder,"area":Limitarea,"status":LimitStaffstatus};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var Inputstaff=0<$(ans).find("answer").attr("task")?'<hr style="border:1px dashed #ccc;width:90%;"><input id="newstaff" type="button" value="������Ա��" onclick="AddStaff();" />':'';
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="8" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="staffinp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td>������<input id="name" value="" size=6;/></td>';
					htmlthead+='<td>Ȩ�ޣ�<select id="posit" onchange="chPosition(0);"></select><label id="hStatics0"></label></td>';
					htmlthead+='<td>������<select id="area"></select></td>';
					htmlthead+='<td>�绰��<input id="tel" value="" size=8;/></td>';
					htmlthead+='<td>���䣺<input id="email" value="" size=20;/></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>״̬��<select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreStaff(0);"/> <input type="button" value="ȡ ��" onclick="Cancelnew(0);"/></td>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="8%" style="border-radius:10px 0 0 0;">����</th>';
					htmlthead+='<th width="8%">Ȩ��</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeStaffOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmlthead+='<th width="8%">�ֻ�</th>';
					htmlthead+='<th width="14%">����</th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeStaffOrder(\'time\');" class="tooltip" title="��������½ʱ������" >������½ʱ��<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��������½ʱ������" /></a> </th>';
					htmlthead+='<th width="10%">ְ��</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeStaffOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmlthead+='<th width="14%">����</th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="staffinp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td><input id="name" value="" size=6;/></td>';
					htmlthead+='<td><select id="posit" onchange="chPosition(0);"></select><label id="hStatics0"></label></td>';
					htmlthead+='<td><select id="area"></select></td>';
					htmlthead+='<td><input id="tel" value="" size=8;/></td>';
					htmlthead+='<td><input id="email" value="" size=20;/></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td><select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreStaff(0);"/> <input type="button" value="ȡ ��" onclick="Cancelnew(0);"/></td>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var consultid=$(this).find("consultid").text();
						var activestat=$(this).find("active").text();
						var scolor="";
						if(sid==0)scolor="red";if(sid==1)scolor="green";
						acolor=(activestat.indexOf("��")>=0)?"red":"green";
						htmltbody+="<tr id='staff"+dataid+"'class='cstaff'>";
						htmltbody+='<td><span style="font-weight:bold;" id="staffUname'+dataid+'">'+$(this).find("name").text()+'</span></td>';
						htmltbody+="<td>��"+$(this).find("posit").text()+"��"+(0<$(this).find("ismajor").text()?"<span style='color:red;' class='tooltip' title='�����ܼ༶'>��</span>":"")+"</td>";
						htmltbody+="<td>"+$(this).find("locate").text()+"</td>";
						htmltbody+="<td>"+$(this).find("tel").text()+"</td>";
						htmltbody+="<td style='text-align:left;padding-left:5px;'>"+$(this).find("email").text()+"</td>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+="<td style='font-size:9pt;color:blue;'>"+$(this).find("duty").text()+($(this).find("levelname").text()==''?'':'<span style="color:#666;">('+$(this).find("levelname").text()+')</span>')+($(this).find("department").text()==''?'':'<br/><span style="color:#999;">('+$(this).find("department").text()+')</span>')+($(this).find("isduty").text()==0?"":" <input type='button' value='����' onclick='Optionduty("+dataid+");' />")+"</td>";
						htmltbody+='</td><td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span><br/>(<span style="color:'+acolor+';font-size:8pt;">'+activestat+'</span>)</td>';
						htmltbody+="<td class='op1'>"+($(this).find("isop").text()==0?"-":"[<a href='javascript:void(0);' onclick='StaffEdit("+dataid+");'>�޸�</a>] [<a href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫ���ø�Ա�����룿\")) StaffPwdRe("+dataid+");'>��������</a>] [<a href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫɾ����Ա����\")) StaffDelete("+dataid+");'>ɾ��</a>]")+"</td>";
						htmltbody+="</tr>";
						htmltbody+="<tr id='staffinp"+dataid+"' style='display:none' class='cstaffinp' >";
						htmltbody+='<td><input id="name" value="'+$(this).find("name").text()+'" size=6 /></td>';
						htmltbody+='<td><select id="posit" onchange="chPosition('+dataid+');"></select><label id="hStatics'+dataid+'"></label></td>';
						htmltbody+='<td><select id="area"></select></td>';
						htmltbody+='<td><input id="tel" value="'+$(this).find("tel").text()+'" size=8 /></td>';
						htmltbody+='<td><input id="email" value="'+$(this).find("email").text()+'" size=20/></td>';
						htmltbody+='<td>'+$(this).find("time").text()+'</td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td><select id="stat"></select></td>';
						htmltbody+='<td><input type="button" value="�� ��" onclick="restoreStaff('+dataid+');"/> <input type="button" value="ȡ ��" onclick="Cancelnew('+dataid+');"/></td>';
						htmltbody+="</tr>";
						htmltbody+="<tr style='display:none'></tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStaffPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStaffPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStaffPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoStaffPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeStaffPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
				$('#task').html(Inputstaff);
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayStaffOrder();
			$('.tooltip').toolTip();
		}
	});
};

var Optionduty=function(i){
	$("#Operate").html("");
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#staffUname"+i).text()+'</span>��</li><hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;line-height:25px;">���ţ�<select id="staffduty"></select> �����ţ�<input id="isGroup" type="checkbox" /></li>';
	htmlOperate+='<li style="text-align:left;line-height:25px;">ְ����<input id="dutydetail" type="text" size:20px;/> �Ƿ��ö���<input id="isTop" type="checkbox" /></li>';
	htmlOperate+='<li style="text-align:left;line-height:25px;">�ֻ���<input id="dutytelinner" type="text" size:20px;/></li>';
	htmlOperate+='<li style="text-align:left;line-height:25px;">���ߣ�<input id="dutytelouter" type="text" size:20px;/></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;">';
	htmlOperate+='<li style="text-align:left;line-height:25px;display:none;" class="stationli">��Ч������<select id="station"></select></li>';
	htmlOperate+='<li style="text-align:left;line-height:25px;display:none;" class="stationli">��λ������<input id="allowance" type="text" size=10 /><hr style="border:1px dashed #ccc;"></li>';
	htmlOperate+='<li><input id="submitoperate" name="input" type="button" onclick="toModify('+i+');" value=" �� �� " /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" ȡ �� " /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetStaffDutySels(i);
	showForm("#Operate","#fade");
};

var GetStaffDutySels=function(i){
	var requests={"question":"GetStaffDutySels","sid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmllimitselect=htmllimitselect2="";
				htmllimitselect+='<option value="0">��ѡ��</option>';
				$(ans).find("option").each(function(){
					htmllimitselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#staffduty").html(htmllimitselect);
				$("#dutydetail").attr("value",$(ans).find("answer").attr("name"));
				$("#dutytelinner").attr("value",$(ans).find("answer").attr("telin"));
				$("#dutytelouter").attr("value",$(ans).find("answer").attr("telout"));
				if(0<$(ans).find("answer").attr("istop"))$("#isTop").attr("checked",true);
				else $("#isTop").attr("checked",false);
				if(0<$(ans).find("answer").attr("isgroup"))$("#isGroup").attr("checked",true);
				else $("#isGroup").attr("checked",false);
				htmllimitselect2+='<option value="0">δ����</option>';
				$(ans).find("duty").each(function(){
					htmllimitselect2+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#allowance").attr("value",$(ans).find("answer").attr("allowance"));
				$("#station").html(htmllimitselect2);
				if(0<$(ans).find("answer").attr("limit"))$(".stationli").show();
				else $(".stationli").hide();
				$("#Operateloading").html("");
			}
		},
		complete:function(){
		}
	});
};

var toModify=function(i){
	var moddepartment=$("#staffduty").val();
	var modduty=$("#dutydetail").attr("value");
	var modtelin=$("#dutytelinner").attr("value");
	var modtelout=$("#dutytelouter").attr("value");
	var modtop=$("#isTop").attr("checked")?1:0;
	var modgroup=$("#isGroup").attr("checked")?1:0;
	var modstation=$("#station").val();
	var modallowance=$("#allowance").attr("value");
	var requests={"question":"toModify","sid":i,"department":moddepartment,"modduty":modduty,"modtelin":modtelin,"modtelout":modtelout,"modtop":modtop,"modgroup":modgroup,"modstation":modstation,"modallowance":modallowance};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html("��ѡ����Ա���ڲ��ţ�");
			}
			if(1010==err){
				hideForm("#Operate","#fade");
				GetStaffCondition();
			}
		},
		complete:function(){
		}
	});
};

var chPosition=function(i){
	var dpos=$("#staffinp"+i).find('#posit').val();
	var requests={"question":"chPosition","sid":i,"did":dpos};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#hStatics"+i).html('');
			}
			if(1010==err){
				var isStaticsChk=0<$(ans).find("answer").attr("note")?"checked":"";
				var isRankingChk=0<$(ans).find("answer").attr("gopage")?"checked":"";
				if(0==dpos)$("#hStatics"+i).html('');
				else $("#hStatics"+i).html('<br/><input id="iStatics'+i+'" type="checkbox" '+isStaticsChk+'/>ͳ�� <input id="isRanking'+i+'" type="checkbox" '+isRankingChk+'/>����')
			}
			if(2001==err){
				var isShowChk=0<$(ans).find("answer").attr("note")?"checked":"";
				if(0==dpos)$("#hStatics"+i).html('');
				else $("#hStatics"+i).html('<br/><input id="iShowRes'+i+'" type="checkbox" '+isShowChk+'/>�������ܼ༶')
			}
			if(2002==err){
				var isOccShowChk=0<$(ans).find("answer").attr("note")?"checked":"";
				if(0==dpos)$("#hStatics"+i).html('');
				else $("#hStatics"+i).html('<br/><input id="iShowRes'+i+'" type="checkbox" '+isOccShowChk+'/>�����ܼ༶')
			}
			if(2003==err){
				var isONLShowChk=0<$(ans).find("answer").attr("note")?"checked":"";
				if(0==dpos)$("#hStatics"+i).html('');
				else $("#hStatics"+i).html('<br/><input id="iShowRes'+i+'" type="checkbox" '+isONLShowChk+'/>������')
			}
		},
		complete:function(){
		}
	});
};

var Cancelnew=function(c){
	if(0==c)$("#staffinp0").hide();
	$(".cstaffinp").hide();
	$(".cstaff").show();
	GetStaffCondition();
};

var AddStaff=function(){
	GetStaffSelOption(0);
	$(".cstaffinp").hide();
	$(".cstaff").show();
	$("#staffinp0").show();
};

var StaffEdit=function(i){
	GetStaffSelOption(i);
	$("#staffinp0").hide();
	$(".cstaffinp").hide();
	$(".cstaff").show();
	$("#staffinp"+i).show();
	$("#staff"+i).hide();
};

var StaffPwdRe=function(i){
	var requests={"question":"StaffPwdRe","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var restoreStaff=function(i){
	var rname=$("#staffinp"+i).find('#name').attr('value');
	var rposit=$("#staffinp"+i).find('#posit').val();
	var rarea=$("#staffinp"+i).find('#area').val();
	var rtel=$("#staffinp"+i).find('#tel').attr('value');
	var remail=$("#staffinp"+i).find('#email').attr('value');
	var rstat=$("#staffinp"+i).find('#stat').val();
	var isStatic=$("#iStatics"+i).attr("checked")?1:0;
	var isRanking=$("#isRanking"+i).attr("checked")?1:0;
	var isShowing=$("#iShowRes"+i).attr("checked")?1:0;
	var requests={"question":"RestoreStaff","id":i,"name":rname,"posit":rposit,"area":rarea,"tel":rtel,"email":remail,"stat":rstat,"Statics":isStatic,"Ranking":isRanking,"Showing":isShowing};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				GetStaffCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var StaffDelete=function(i){
	var requests={"question":"StaffDelete","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				alert($(ans).find("answer").attr("note"));
				GetStaffCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var GetStaffSelOption=function(i){
	var requests={"question":"GetStaffSelOption","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmllimitselect="";
				htmllimitselect+='<option value="0">��ѡ��</option>';
				$(ans).find("limit").each(function(){
					htmllimitselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#staffinp"+i).find('#posit').html(htmllimitselect);
				var htmlareaselect="";
				if(1==$(ans).find("area").size())htmlareaselect+='<option value="'+$(ans).find("area").attr("id")+'" '+($(ans).find("area").attr("sel")==1? 'selected':'')+'>'+$(ans).find("area").attr("name")+'</option>';
				else{
					htmlareaselect+='<option value="0">��ѡ��</option>';
					$(ans).find("area").each(function(){
						htmlareaselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
					});
				}
				$("#staffinp"+i).find('#area').html(htmlareaselect);
				var htmlstatselect="";
				$(ans).find("stat").each(function(){
					htmlstatselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#staffinp"+i).find('#stat').html(htmlstatselect);
				loadings("h");
			}
		},
		complete:function(){
			chPosition(i);
		}
	});
};
/****************************************************************/
var gotoGradePage=function(p){
	consultpage=p;
	GetGradeCondition();
};

var changeGradePage=function(){
	gotoGradePage($("#changeconsultpage").val());
};

var displayGradeOrder=function(){
	$("#imgtime").hide();
	$("#imggraduate").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	$("#imgacount").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeGradeOrder=function(v){
	$("#imgtime").hide();
	$("#imggraduate").hide();
	$("#imglocate").hide();
	$("#imgstat").hide();
	$("#imgacount").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetGradeCondition();
	$("#img"+v).show();
};

var GradeSearcher=function(){
	Limitarea=0;
	Limitgrade=0;
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeGradeOrder(consultorderV);
};

var setGradeLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getLocalGrade();
	$("#search").val("");
	consultkey="";
};

var CancelGradenew=function(c){
	if(0==c)$("#gradeinp0").hide();
	$(".cgradeinp").hide();
	$(".cgrade").show();
	GetGradeCondition();
};

var GradeEdit=function(i){
	GetGradeSelOption(i);
	$("#gradeinp0").hide();
	$(".cgradeinp").hide();
	$(".cgrade").show();
	$("#gradeinp"+i).show();
	$("#grade"+i).hide();
};

var setLimitGrade=function(){
	Limitgrade=$("#grade").val();
	consultpage=1;
	GetGradeCondition();
	$("#search").val("");
	consultkey="";
};

var AddGrade=function(){
	GetGradeSelOption(0);
	$(".cgradeinp").hide();
	$(".cgrade").show();
	$("#gradeinp0").show();
};

var getLocalGrade=function(){
	var requests={"question":"GetGrade","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var isGrade=0;
				var htmlselGrade='<option value="0">ȫ��</option>';
				if(0<$(ans).find("grade").size()){
					$(ans).find("grade").each(function(){
						if(Limitgrade==$(this).attr("id")){
							isGrade=1;
							htmlselGrade+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("catname")+'('+$(this).attr("locatename")+')</option>';
						}else{
							htmlselGrade+='<option value="'+$(this).attr("id")+'">'+$(this).attr("catname")+'('+$(this).attr("locatename")+')</option>';
						}
					});
				}else{
					htmlselGrade='<option value="0">��</option>';
				}
				if(0==isGrade){
					Limitgrade=0;
				}
				$("#grade").html(htmlselGrade);
			}
		},
		complete:function(){
			getGradeData();
		}
	});
};

var GetGradeSelOption=function(i){
	var requests={"question":"GetGradeSelOption","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(1==err){
				var htmllimitselect="";
				htmllimitselect+='<option value="0">��ѡ��</option>';
				$(ans).find("category").each(function(){
					htmllimitselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#gradeinp"+i).find('#category').html(htmllimitselect);
				var htmlstatselect="";
				$(ans).find("stat").each(function(){
					htmlstatselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#gradeinp"+i).find('#stat').html(htmlstatselect);
				var htmladviserselect="";
				htmladviserselect+='<option value="0">��ѡ��</option>';
				$(ans).find("adviser").each(function(){
					htmladviserselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#gradeinp"+i).find('#staffname').html(htmladviserselect);
				var htmlguidanceselect="";
				htmlguidanceselect+='<option value="0">��ѡ��</option>';
				$(ans).find("guidance").each(function(){
					htmlguidanceselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#gradeinp"+i).find('#guidancename').html(htmlguidanceselect);
				var htmlclasstypeselect="";
				htmlclasstypeselect+='<option value="0">��ѡ��</option>';
				$(ans).find("classroom").each(function(){
					htmlclasstypeselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#gradeinp"+i).find('#classroom').html(htmlclasstypeselect);
				loadings("h");
			}
		},
		complete:function(){
			
		}
	});
};

var restoreGrade=function(i){
	var gname=$("#gradeinp"+i).find('#name').attr('value');
	var gstartdate=$("#gradeinp"+i).find('#startdate').attr('value');
	var gstopdate=$("#gradeinp"+i).find('#stopdate').attr('value');
	var gcategory=$("#gradeinp"+i).find('#category').val();
	var gstat=$("#gradeinp"+i).find('#stat').val();
	var gadviser=$("#gradeinp"+i).find('#staffname').val();
	var gguidance=0;//$("#gradeinp"+i).find('#guidancename').val();
	var gclassroom=$("#gradeinp"+i).find('#classroom').val();
	var requests={"question":"RestoreGrade","id":i,"name":gname,"startdate":gstartdate,"stopdate":gstopdate,"category":gcategory,"stat":gstat,"adviser":gadviser,"guidance":gguidance,"classroom":gclassroom};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				GetGradeCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var GradeDelete=function(i){
	var requests={"question":"GradeDelete","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				alert($(ans).find("answer").attr("note"));
				GetGradeCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var getGradeData=function(){
	var requests={"question":"GetGradeData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"grade":Limitgrade};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var glimit=$(ans).find("answer").attr("glimit");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="10" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="gradeinp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td>�������ڣ�<input class="Wdate" id="startdate" type="text" size="9" onclick="WdatePicker();" readonly="readonly" /></td>';
					htmlthead+='<td>�༶���ƣ�<input id="name" value="" size=8;/></td>';
					htmlthead+='<td>���ͣ�<select id="category"></select></td>';
					htmlthead+='<td>��ҵ���ڣ�<input class="Wdate" id="stopdate" type="text" size="9" onclick="WdatePicker();" readonly="readonly" /></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>ְҵ�滮��<select id="staffname"></select></td>';
					//htmlthead+='<td>��ҵʦ��<select id="guidancename"></select></td>';
					htmlthead+='<td>���ͣ�<select id="classroom"></select></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>״̬��<select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreGrade(0);"/> <input type="button" value="ȡ ��" onclick="CancelGradenew(0);"/></td>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="10%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeGradeOrder(\'time\');" class="tooltip" title="������ʱ������" >��������<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ѧʱ������" /></a> </th>';
					htmlthead+='<th width="7%">�༶����</th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeGradeOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a> | ����</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeGradeOrder(\'graduate\');" class="tooltip" title="����ҵʱ������" >��ҵ����<img id="imggraduate" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ҵʱ������" /></a> </th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeGradeOrder(\'acount\');" class="tooltip" title="���༶������������" >������<img id="imgacount" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���༶������������" /></a> </th>';
					htmlthead+='<th width="12%">ְҵ�滮</th>';
					//htmlthead+='<th width="6%">��ҵʦ</th>';
					htmlthead+='<th width="10%">����</th>';
					htmlthead+='<th width="11%">��ʦ</th>';
					htmlthead+='<th width="10%">�γ̽���</th>';
					htmlthead+='<th width="4%"><a href="javascript:void(0);" onclick="changeGradeOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmlthead+='<th width="6%">����</th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="gradeinp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td><input class="Wdate" id="startdate" type="text" size="9" onclick="WdatePicker();" readonly="readonly" /></td>';
					htmlthead+='<td><input id="name" value="" size=8;/></td>';
					htmlthead+='<td><select id="category"></select></td>';
					htmlthead+='<td><input class="Wdate" id="stopdate" type="text" size="9" onclick="WdatePicker();" readonly="readonly" /></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td><select id="staffname"></select></td>';
					//htmlthead+='<td><select id="guidancename"></select></td>';
					htmlthead+='<td><select id="classroom"></select></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td><select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreGrade(0);"/> <input type="button" value="ȡ ��" onclick="CancelGradenew(0);"/></td>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						var htmltNum=($(this).find("tnumber").text()==0?"��":"����["+$(this).find("tnumber").text()+"]��ʦ")+"<br/>";
						if(sid==0)scolor="red";if(sid==1)scolor="green";
						var shownumberlimit="";
						if(0< parseInt($(this).find("thiscnumber").text())){
							if(parseInt($(this).find("thisclimit").text())< parseInt($(this).find("thiscnumber").text()))shownumberlimit='<span style="color:red;">��</span>';
							if(parseInt($(this).find("thisclimit").text())==parseInt($(this).find("thiscnumber").text()))shownumberlimit='<span style="color:blue;">��</span>';
							else shownumberlimit='<sup><span style="color:#DF7401;">'+parseInt($(this).find("thiscnumber").text())+'</span></sup>';
						}
						htmltbody+="<tr id='grade"+dataid+"' class='cgrade'>";
						htmltbody+="<td>"+$(this).find("startdate").text()+"</td>";
						htmltbody+='<td><span id="classname'+dataid+'" style="font-weight:bold;">'+$(this).find("name").text()+'</span>'+(0<$(this).find("thisevlimit").text()&&0<$(this).find("limit").text()?' <input type="button" onclick="toEval('+dataid+');" value="��ʦ����" />':'')+'</td>';
						htmltbody+="<td style='font-size:10px;'>"+$(this).find("locate").text()+"<br/>��"+$(this).find("category").text()+"��</td>";
						htmltbody+="<td>"+$(this).find("stopdate").text()+"</td>";
						var acountcolor='green';
						if(100>$(this).find("acount").text())acountcolor='#319fcc';
						if(80>$(this).find("acount").text())acountcolor='#F7BE81';
						if(60>$(this).find("acount").text())acountcolor='red';
						htmltbody+="<td><span style='padding:0 2px 0 2px;color:#FFF;background-color:"+acountcolor+";border-radius:4px;'>"+$(this).find("acount").text()+"</span></td>";
						htmltbody+="<td>"+($(this).find("adviser").text()==''?'-':($(this).find("adviser").text())+(0<$(this).find("thisOccevlimit").text()&&0<$(this).find("limit").text()?'<br/><input type="button" onclick="toOccEval('+dataid+');" value="ְ��ʦ����" />':''))+"</td>";
						//htmltbody+="<td>"+($(this).find("guidance").text()==''?'-':$(this).find("guidance").text())+"</td>";
						htmltbody+="<td style='font-size:11px;'>"+($(this).find("classroom").text()==''?'-':$(this).find("classroom").text())+shownumberlimit+"</td>";
						htmltbody+='<td>'+htmltNum+'<input type="button" value="'+(0<$(this).find("limit").text()?"�鿴/����":" �鿴 ")+'" onclick="GradeOption('+dataid+');"/></td>';
						htmltbody+='<td style="font-size:11px;">'+($(this).find("tprocess").text()==""?"-":'<span style="color:#00b6cf">'+$(this).find("tprocess").text())+'</span></td>';
						htmltbody+='<td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span></td>';
						if(0<$(this).find("limit").text()){
							htmltbody+="<td class='op1'>[<a href='javascript:void(0);' onclick='GradeEdit("+dataid+");'>�޸�</a>] [<a href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫɾ���ð༶��\")) GradeDelete("+dataid+");'>x</a>]</td>";
						}else htmltbody+="<td>-</td>";
						htmltbody+="</tr>";
						htmltbody+="<tr id='gradeinp"+dataid+"' style='display:none' class='cgradeinp' >";
						htmltbody+='<td><input class="Wdate" id="startdate" value="'+$(this).find("startdate").text()+'" size=9 onclick="WdatePicker();" readonly="readonly" /></td>';
						htmltbody+='<td><input id="name" value="'+$(this).find("name").text()+'" size=10 /></td>';
						htmltbody+='<td><select id="category" disabled></select></td>';
						htmltbody+='<td><input class="Wdate" id="stopdate" value="'+$(this).find("stopdate").text()+'" size=9 onclick="WdatePicker();" readonly="readonly" '+(0<$(this).find("stopdatelimit").text()?"":"disabled")+'/></td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td><select id="staffname"></select></td>';
						//htmltbody+='<td><select id="guidancename"></select></td>';
						htmltbody+='<td><select id="classroom"></select></td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td><select id="stat"></select></td>';
						htmltbody+='<td><input type="button" value="�� ��" onclick="restoreGrade('+dataid+');"/> <input type="button" value="ȡ ��" onclick="CancelGradenew('+dataid+');"/></td>';
						htmltbody+="</tr>";
						htmltbody+="<tr style='display:none'></tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoGradePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoGradePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoGradePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoGradePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeGradePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
				if(0<glimit)$('#taska').html('<hr style="border:1px dashed #ccc;width:90%;"><input id="newgrade" type="button" value="�����°༶" onclick=AddGrade(); />');
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayGradeOrder();
			$('.tooltip').toolTip();
		}
	});
};

var toEval=function(i){
	var requests={"question":"GetIstoEval","classid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				$("#Operate").html("");
				var htmlOperate="";
				htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">�Ƿ�������<span style="color:blue;">'+$(ans).find("answer").attr("note")+'</span>���γ�<span style="color:blue;">'+$(ans).find("answer").attr("course")+'</span>��ʦ��<span style="color:blue;">'+$(ans).find("answer").attr("gopage")+'</span>�������⣿</span>';
				htmlOperate+='<hr></li><li><input id="submiteval" onclick="SubmitEvalOptional('+i+');" type="button" value=" ȷ�� " />&nbsp;&nbsp;<input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" ȡ�� " /> <span id="Operateloading" style="color:red;"></span></li>';
				$("#Operate").html(htmlOperate);
				showForm("#Operate","#fade");
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var toOccEval=function(i){
	var requests={"question":"GetIstoOccEval","classid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				$("#Operate").html("");
				var htmlOperate="";
				htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">�Ƿ�������<span style="color:blue;">'+$(ans).find("answer").attr("note")+'</span>��ְҵ�滮ʦ��<span style="color:blue;">'+$(ans).find("answer").attr("gopage")+'</span>�������⣿<br/><span style="font-size:12px;font-weight:normal;">����ǰ�γ�<span style="color:blue;">'+$(ans).find("answer").attr("course")+'</span>��</span></span>';
				htmlOperate+='<hr></li><li><input id="submiteval" onclick="SubmitOccEvalOptional('+i+');" type="button" value=" ȷ�� " />&nbsp;&nbsp;<input name="cancel" onclick="CloseW(\'Operate\');" type="button" value=" ȡ�� " /> <span id="Operateloading" style="color:red;"></span></li>';
				$("#Operate").html(htmlOperate);
				showForm("#Operate","#fade");
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var SubmitEvalOptional=function(i){
	var requests={"question":"SubmitEvalOptional","classid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submiteval").attr("disabled",true);
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
				$("#Operateloading").html('<br/>'+$(ans).find("answer").attr("note"));
				$("#submiteval").attr("disabled",false);
			}
			if(1010==err){
				$("#Operate").html("");
				hideForm("#Operate","#fade");
				alert("���������ɹ���ѧԱ��ͨ���Լ����˺ŶԽ�ʦ���ڿν��в�����");
			}
		},
		complete:function(){
		}
	});
};

var SubmitOccEvalOptional=function(i){
	var requests={"question":"SubmitOccEvalOptional","classid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
			$("#submiteval").attr("disabled",true);
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
				$("#Operateloading").html('<br/>'+$(ans).find("answer").attr("note"));
				$("#submiteval").attr("disabled",false);
			}
			if(1010==err){
				$("#Operate").html("");
				hideForm("#Operate","#fade");
				alert("���������ɹ���ѧԱ��ͨ���Լ����˺Ŷ�ְҵ�滮ʦ���в�����");
			}
		},
		complete:function(){
		}
	});
};

var GradeOption=function(i){
	$("#Operate").html("");
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;"><span style="font-weight:bold;font-size:14px;">'+$("#classname"+i).text()+'</span> ��ʦ���ţ�<span style="color:#DF7401" id="ttip"></span><hr>';
	htmlOperate+='<div id="Operatesel" style="line-height:22px;font-size:13px;"></div>';
	htmlOperate+='<hr></li><li><input name="cancel" onclick="CloseWTeacher(\'Operate\');" type="button" value="�ر�" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	GetGradeCourseTeachers(i);
	showForm("#Operate","#fade");
};

var CloseWTeacher=function(i){
	hideForm("#"+i,"#fade");
	GetGradeCondition();
};

var GetGradeCourseTeachers=function(g){
	var requests={"question":"GetGradeCourseTeachers","classid":g};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				hideForm("#Operate","#fade");
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlcoursesel ="";
				var tlimit=0;
				$(ans).find("option").each(function(){
					var tstat=($(this).attr("tstat")>0)?"":($(this).attr("tstat")==""?'<span style="color:#999;">������</span>':'<span style="color:red;">��ְͣ��</span>');
					htmlcoursesel+='<li><span style="font-weight:bold;">'+$(this).attr("cname")+'</span>��'+$(this).attr("cday")+'�죩 >>> <label id="c'+$(this).attr("cid")+'">'+(0<$(this).attr("tlimit")?'<a href="javascript:void(0);" onclick="GetCurrentTeachers('+$(this).attr("cid")+','+$(this).attr("tid")+','+g+');" style="text-decoration:none;">'+($(this).attr("tid")==0?'<span style="color:#999;">δ����</span>':$(this).attr("tname")+tstat)+'</a>':($(this).attr("tid")==0?'<span style="color:#999;">δ����</span>':'<span style="color:blue;">'+$(this).attr("tname")+'</span>'+tstat))+'</label></li>';
					tlimit=$(this).attr("tlimit"); 
				});
				if(0<tlimit)$("#ttip").html("��������Ӧ��ʦλ�ÿɽ������ã�");
				$("#Operatesel").html(htmlcoursesel);
			}
		},
		complete:function(){
		}
	});
};

var GetCurrentTeachers=function(c,t,g){
	var requests={"question":"GetCurrentTeachers","tid":t};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(1==err){
				$("#Operateloading").html("");
				var htmlteachersel ="";
				htmlteachersel+='<select id="sel'+c+'" onchange="changeTeacher('+c+','+g+');"><option value="0">δ����</option>';
				$(ans).find("option").each(function(){
					var tstat=($(this).attr("tstat")>0)?"":'��ְͣ��';
					htmlteachersel+='<option value="'+$(this).attr("tid")+'" '+($(this).attr("sel")==1?'selected = "selected"':'')+'>'+$(this).attr("tname")+tstat+'</option>';
				});
				htmlteachersel+='</select>';
				$("#c"+c).html(htmlteachersel);
			}
		},
		complete:function(){
		}
	});
};

var changeTeacher=function(c,g){
	t=$("#sel"+c).val();
	var requests={"question":"changeTeacher","cid":c,"tid":t,"gid":g};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				GetGradeCourseTeachers(g);
			}
		},
		complete:function(){
		}
	});
};

var GetGradeCondition=function(){
	var requests={"question":"GetGradeConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setGradeLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("grade").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">�༶���ͣ�</span><select id="grade" onchange=setLimitGrade();>';
					if(0==Limitgrade){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("grade").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("catname")+'('+$(this).attr("locatename")+')</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("grade").each(function(){
							if($(this).attr("id")==Limitgrade){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("catname")+'('+$(this).attr("locatename")+')</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("catname")+'('+$(this).attr("locatename")+')</option>';
							}
						});
					}
					html+="</select></label>";
				}
				$("#selects").html(html);
			}
		},
		complete:function(){
			getLocalGrade();
		}
	});
};

/****************************************************************/
var gotoCoursePage=function(p){
	consultpage=p;
	getCourseData();
};

var changeCoursePage=function(){
	gotoCoursePage($("#changeconsultpage").val());
};

var displayCourseOrder=function(){
	$("#imgname").hide();
	$("#imgstat").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeCourseOrder=function(v){
	$("#imgname").hide();
	$("#imgstat").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	getCourseData();
	$("#img"+v).show();
};

var CourseSearcher=function(){
	consultorderV="name";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgname").attr("src",htmlimgAsc);
	changeCourseOrder(consultorderV);
};

var CancelCoursenew=function(c){
	if(0==c)$("#courseinp0").hide();
	$(".ccourseinp").hide();
	$(".ccourse").show();
	getCourseData();
};

var CourseEdit=function(i){
	GetCourseSelOption(i);
	$("#courseinp0").hide();
	$(".ccourseinp").hide();
	$(".ccourse").show();
	$("#courseinp"+i).show();
	$("#course"+i).hide();
};

var AddCourse=function(){
	GetCourseSelOption(0);
	$(".ccourseinp").hide();
	$(".ccourse").show();
	$("#courseinp0").show();
};

var GetCourseSelOption=function(i){
	var requests={"question":"GetCourseSelOption","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(1==err){
				var htmlstatselect=htmltypeselect="";
				$(ans).find("stat").each(function(){
					htmlstatselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$(ans).find("type").each(function(){
					htmltypeselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#courseinp"+i).find('#stat').html(htmlstatselect);
				$("#courseinp"+i).find('#type').html(htmltypeselect);
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var restoreCourse=function(i){
	var cname=$("#courseinp"+i).find('#name').attr('value');
	var cdate=$("#courseinp"+i).find('#date').attr('value');
	var ccomment=$("#courseinp"+i).find('#comment').val();
	var ctype=$("#courseinp"+i).find('#type').val();
	var cstat=$("#courseinp"+i).find('#stat').val();
	var requests={"question":"RestoreCourse","id":i,"name":cname,"date":cdate,"comment":ccomment,"type":ctype,"stat":cstat};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				getCourseData();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var CourseDelete=function(i){
	var requests={"question":"CourseDelete","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				alert($(ans).find("answer").attr("note"));
				getCourseData();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var CourseDays=function(i){
	$("#daythead").html("");
	$("#daytbody").html("");
	$("#daytitle").html("");
	showForm("#Lists","#fade");
	courseListId=i;
	var requests={"question":"CourseDaysList","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(1==err){
				var daythead="";
				var daytbody="";
				$("#Operateloading").html("");
				daythead+='<tr>';
				daythead+='<th width="8%">����</th>';
				daythead+='<th width="40%">����</th>';
				daythead+='<th width="13%">�μ�</th>';
				daythead+='<th width="13%">��ҵ</th>';
				daythead+='<th width="13%">��Ƶ</th>';
				daythead+='<th width="13%">����</th>';
				daythead+='</tr>';
				$(ans).find("days").each(function(){
					daytbody+='<tr id="d'+$(this).attr("id")+'" class="listdays">';
					daytbody+='<td>��'+$(this).attr("id")+'�죺</td>';
					daytbody+='<td><input type="text" value="'+$(this).attr("title")+'" size="43%"/></td>';
					daytbody+='<td><input type="text" value="'+$(this).attr("ware")+'" size="12%" /></td>';
					daytbody+='<td><input type="text" value="'+$(this).attr("docs")+'" size="12%" /></td>';
					daytbody+='<td><input type="text" value="'+$(this).attr("vedio")+'" size="12%" /></td>';
					daytbody+='<td><input type="text" value="'+$(this).attr("works")+'" size="12%" /></td>';
					daytbody+='</tr>';
				});
				$("#daythead").html(daythead);
				$("#daytbody").html(daytbody);
				$("#daytitle").html($(ans).find("answer").attr("name"));
				JudgeWindowSizetoCss("#Lists");
			}
		},
		complete:function(){
		}
	});
};

var toSubmitDayList=function(){
	var strdaylist="";
	for(var i=1;i<=$('.listdays').size();i++){
		strdaylist+=i+'@'+$('#d'+i).find("input[type='text']").eq(0).attr("value")+'|'+$('#d'+i).find("input[type='text']").eq(1).attr("value")+'|'+$('#d'+i).find("input[type='text']").eq(2).attr("value")+'|'+$('#d'+i).find("input[type='text']").eq(3).attr("value")+'|'+$('#d'+i).find("input[type='text']").eq(4).attr("value")+';';
	}
	var requests={"question":"toSubmitDayList","cid":courseListId,"dstr":strdaylist};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Operateloading").html(htmlimgo);
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
			if(1010==err){
				$("#Operateloading").html("");
				hideForm("#Lists","#fade");
				getCourseData();
			}
		},
		complete:function(){
		}
	});
};

var getCourseData=function(){
	var requests={"question":"GetCourseData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="5" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="courseinp0" style="display:none;background-color:#eee;height:60px;">';
					htmlthead+='<td>��Ŀ���ƣ�<input id="name" value="" size=10;/></td>';
					htmlthead+='<td>�ڿ�������<input id="date" value="" size=5;/></td>';
					htmlthead+='<td>���飺<textarea id="comment" value="" style="width:70%; height: 40px;" /></td>';
					htmlthead+='<td>�����׶Σ�<select id="type"></select></td>';
					htmlthead+='<td>״̬��<select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreCourse(0);"/> <input type="button" value="ȡ ��" onclick="CancelCoursenew(0);"/></td>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="20%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeCourseOrder(\'name\');" class="tooltip" class="tooltip" title="����������" >��Ŀ����<img id="imgname" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmlthead+='<th width="10%">�ڿ�����</th>';
					htmlthead+='<th width="30%">����</th>';
					htmlthead+='<th width="20%">�����׶�</th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeCourseOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmlthead+='<th width="10%">����</th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="courseinp0" style="display:none;background-color:#eee;height:60px;">';
					htmlthead+='<td><input id="name" value="" size=10;/></td>';
					htmlthead+='<td><input id="date" value="" size=5;/></td>';
					htmlthead+='<td><textarea id="comment" value="" style="width:70%; height: 40px;" /></td>';
					htmlthead+='<td><select id="type"></select></td>';
					htmlthead+='<td><select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreCourse(0);"/> <input type="button" value="ȡ ��" onclick="CancelCoursenew(0);"/></td>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==0)scolor="red";if(sid==1)scolor="green";
						htmltbody+="<tr id='course"+dataid+"' class='ccourse'>";
						htmltbody+='<td><span style="font-weight:bold;">'+$(this).find("name").text()+'</span></td>';
						htmltbody+="<td>"+$(this).find("date").text()+"�� <input type='button' value=' ���� ' onclick='CourseDays("+dataid+");' /></td>";
						htmltbody+="<td>"+$(this).find("comment").text()+"</td>";
						htmltbody+="<td>"+$(this).find("type").text()+"</td>";
						htmltbody+='</td><td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span></td>';
						htmltbody+="<td class='op1'>[<a href='javascript:void(0);' onclick='CourseEdit("+dataid+");'>�޸�</a>] [<a href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫɾ���ÿγ̣�\")) CourseDelete("+dataid+");'>ɾ��</a>]</td>";
						htmltbody+="</tr>";
						htmltbody+="<tr id='courseinp"+dataid+"' style='display:none;height:50px;' class='ccourseinp' >";
						htmltbody+='<td><input id="name" value="'+$(this).find("name").text()+'" size=10 /></td>';
						htmltbody+='<td><input id="date" value="'+$(this).find("date").text()+'" size=5 /></td>';
						htmltbody+='<td><textarea id="comment" style="width:70%; height: 40px;">'+$(this).find("comment").text()+'</textarea></td>';
						htmltbody+='<td><select id="type"></select></td>';
						htmltbody+='<td><select id="stat"></select></td>';
						htmltbody+='<td><input type="button" value="�� ��" onclick="restoreCourse('+dataid+');"/> <input type="button" value="ȡ ��" onclick="CancelCoursenew('+dataid+');"/></td>';
						htmltbody+="</tr>";
						htmltbody+="<tr style='display:none'></tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCoursePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCoursePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCoursePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCoursePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeCoursePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
				$('#task').html('<hr style="border:1px dashed #ccc;width:90%;"><input id="newgrade" type="button" value="�����¿�Ŀ" onclick=AddCourse(); />');
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayCourseOrder();
			$('.tooltip').toolTip();
		}
	});
};

/****************************************************************/
var setLimitAreastat=function(c){
	consultpage=1;
	Limitarea=c;
	$("#tonewarea").hide();
	GetAreaCondition();
	$("#search").val("");
	consultkey="";
};

var CancelAreanew=function(c){
	if(0==c)$("#areainp0").hide();
	$(".careainp").hide();
	$(".carea").show();
	GetAreaCondition();
};

var changeAreaOrder=function(v){
	$("#imglocate").hide();
	$("#imgstat").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetAreaCondition();
	$("#img"+v).show();
};

var restoreArea=function(i){
	var aname=$("#areainp"+i).find('#name').attr('value');
	var aarea=$("#areainp"+i).find('#area').val();
	var astat=$("#areainp"+i).find('#stat').val();
	var requests={"question":"RestoreArea","id":i,"name":aname,"area":aarea,"stat":astat};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				GetAreaCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var AreaEdit=function(i){
	GetAreaSelOption(i);
	$("#areainp0").hide();
	$(".careainp").hide();
	$(".carea").show();
	$("#areainp"+i).show();
	$("#darea"+i).hide();
};

var gotoAreaPage=function(p){
	consultpage=p;
	GetAreaCondition();
};

var changeAreaPage=function(){
	gotoAreaPage($("#changeconsultpage").val());
};

var AddArea=function(){
	GetAreaSelOption(0);
	$(".careainp").hide();
	$(".carea").show();
	$("#areainp0").show();
};

var AreaSearcher=function(){
	Limitarea=0;
	consultorderV="normal";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	//$("#imgname").attr("src",htmlimgAsc);
	changeAreaOrder(consultorderV);
};

var displayAreaOrder=function(){
	$("#imglocate").hide();
	$("#imgstat").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var AddArea=function(){
	GetAreaSelOption(0);
	$(".careainp").hide();
	$(".carea").show();
	$("#areainp0").show();
};

var GetAreaSelOption=function(i){
	var requests={"question":"GetAreaSelOption","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmlareaselect="";
				htmlareaselect+='<option value="0">��ѡ��</option>';
				$(ans).find("area").each(function(){
					htmlareaselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#areainp"+i).find('#area').html(htmlareaselect);
				var htmlstatselect="";
				$(ans).find("stat").each(function(){
					htmlstatselect+='<option value="'+$(this).attr("id")+'" '+($(this).attr("sel")==1? 'selected':'')+'>'+$(this).attr("name")+'</option>';
				});
				$("#areainp"+i).find('#stat').html(htmlstatselect);
				loadings("h");
			}
		},
		complete:function(){
			
		}
	});
};

var AreaDelete=function(i){
	var requests={"question":"AreaDelete","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				alert($(ans).find("answer").attr("note"));
				GetAreaCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var newAreaDo=function(){
	var doareaname=$("#tonewarea").find("input").attr("value");
	if(""!=doareaname){
		var requests={"question":"NewAreaDo","name":doareaname};
			$.ajax({
			type:'POST',
			url:doUrl,
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
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(2001==err){
					alert($(ans).find("answer").attr("note"));
					$("#tonewarea").find("input").eq(0).attr("value","");
					$("#tonewarea").find("input").eq(0).focus();
					loadings("h");
				}
				if(1010==err){
					GetAreaCondition();
					loadings("h");
				}
			},
			complete:function(){
			}
		});
	}
}

var GetAreaCondition=function(){
	var requests={"question":"GetAreaConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					if(0==Limitarea){
						html+='<span style="font-weight:bold;">������</span><a class="active" href="javascript:void(0);" onclick=setLimitAreastat(0);>ȫ��</a>&nbsp;&nbsp;&nbsp';
						$(ans).find("area").each(function(){
							html+='<a id="area'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitAreastat(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a><a style="font-size:10px;line-height:18px;padding:0;" href="javascript:void(0);" onclick="delarea('+$(this).attr("id")+');">[x]</a> ';
						});
					}else{
						html+='<span style="font-weight:bold;">������</span><a href="javascript:void(0);" onclick=setLimitAreastat(0);>ȫ��</a>&nbsp;&nbsp;&nbsp;';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<a class="active" id="area'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitAreastat(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a><a style="font-size:10px;line-height:18px;padding:0;" href="javascript:void(0);" onclick="delarea('+$(this).attr("id")+');">[x]</a> ';
							}else{
								html+='<a id="area'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLimitAreastat(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a><a style="font-size:10px;line-height:18px;padding:0;" href="javascript:void(0);" onclick="delarea('+$(this).attr("id")+');">[x]</a> ';
							}
						});
					}
				}
				html+='<label id="tonewarea" style="display:none;"><input value="" size=8;style="margin-left:10px;" /> <input type="button" value=" ���� " onclick="newAreaDo();"/> <input type="button" value=" ȡ�� " onclick="cancelAreaDo();"/></label> <input id="shownewarea" type="button" value=" ���������� " onclick="shownewArea();"/>';
				html+=htmlhr;
				$("#status").html(html);
			}
		},
		complete:function(){
			getAreaData();
		}
	});
};

var delarea=function(i){
	var requests={"question":"SelAreaDelete","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				loadings("h");
			}
			if(1010==err){
				GetAreaCondition();
				loadings("h");
			}
		},
		complete:function(){
		}
	});
};

var shownewArea=function(){
	$('#tonewarea').show();
	$('#shownewarea').hide();
};

var cancelAreaDo=function(){
	$('#tonewarea').hide();
	$('#shownewarea').show();
};

var getAreaData=function(){
	var requests={"question":"GetAreaData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="6" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="areainp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td>�γ����ƣ�<input id="name" value="" size=15;/></td>';
					htmlthead+='<td>������<select id="area"></select></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>״̬��<select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreArea(0);"> <input type="button" value="ȡ ��" onclick="CancelAreanew(0);"></td>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="20%" style="border-radius:10px 0 0 0;">�γ�����</th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeAreaOrder(\'locate\');" class="tooltip" class="tooltip" title="����������" >����<img id="imglocate" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������" /></a></th>';
					htmlthead+='<th width="32%">��Ŀ����</th>';
					htmlthead+='<th width="20%">����</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeAreaOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmlthead+='<th width="10%">����</th>';
					htmlthead+='</tr>';
					htmlthead+='<tr id="areainp0" style="display:none;background-color:#eee;height:35px;">';
					htmlthead+='<td><input id="name" value="" size=15;/></td>';
					htmlthead+='<td><select id="area"></select></td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td>-</td>';
					htmlthead+='<td><select id="stat"></select></td>';
					htmlthead+='<td><input type="button" value="�� ��" onclick="restoreArea(0);"/> <input type="button" value="ȡ ��" onclick="CancelAreanew(0);"/></td>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==0)scolor="red";if(sid==1)scolor="green";
						htmltbody+="<tr id='darea"+dataid+"'class='carea'>";
						htmltbody+='<td id="cname'+dataid+'"><span style="font-weight:bold;">'+$(this).find("name").text()+'</span></td>';
						htmltbody+="<td id='clocate"+dataid+"'>"+$(this).find("locate").text()+"</td>";
						htmltbody+="<td>"+$(this).find("comment").text()+" <input type='button' value='����' onclick='CourseOption("+dataid+");' /></td>";
						htmltbody+="<td>";
						for(var i=0;i< $(this).find("feecount").text();i++){
							if($(this).find("feelist").size()>0)htmltbody+='<span style="color:red;">���޶���</span>';
							else{
								var htmltbodybr=(0<i)?"<br />":"";
								htmltbody+=htmltbodybr+$(this).find("feelist"+i).find("feename").text()+$(this).find("feelist"+i).find("flag").text()+$(this).find("feelist"+i).find("fee").text();							
							}
						}
						htmltbody+=" <input type='button' value='����' onclick='AreaPrice("+dataid+");' /></td>";
						htmltbody+='</td><td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span></td>';
						htmltbody+="<td class='op1'>[<a href='javascript:void(0);' onclick='AreaEdit("+dataid+");'>�޸�</a>] [<a href='javascript:void(0);' onclick='if(confirm(\"�Ƿ�ȷ��Ҫɾ�������ͣ�\")) AreaDelete("+dataid+");'>ɾ��</a>]</td>";
						htmltbody+="</tr>";
						htmltbody+="<tr id='areainp"+dataid+"' style='display:none' class='careainp' >";
						htmltbody+='<td><input id="name" value="'+$(this).find("name").text()+'" size=15 /></td>';
						htmltbody+='<td><select id="area" disabled></select></td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td>-</td>';
						htmltbody+='<td><select id="stat"></select></td>';
						htmltbody+='<td><input type="button" value="�� ��" onclick="restoreArea('+dataid+');" /> <input type="button" value="ȡ ��" onclick="CancelAreanew('+dataid+');" /></td>';
						htmltbody+="</tr>";
						htmltbody+="<tr style='display:none'></tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoAreaPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoAreaPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoAreaPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoAreaPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeAreaPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
				$('#task').html('<hr style="border:1px dashed #ccc;width:90%;"><input id="newarea" type="button" value="�����¿γ�" onclick=AddArea(); />');
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayAreaOrder();
			$('.tooltip').toolTip();
		}
	});
};

var CourseOption=function(i){
	var htmllist=htmllist2="";
	var requests={"question":"CourseOption","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				alert($(ans).find("answer").attr("note"));
				gotoWhere($(ans).find("answer").attr("gopage"),1);
			}
			if(1==err){
				$("#Operateloading").html("");
				htmllist+='<select name="s1" size="12" multiple="multiple" id="s1" style="background:#EEE;width:auto;">';
				if(0<$(ans).find("sel1").size()){
					$(ans).find("sel1").each(function(){
						htmllist+='<option value="'+$(this).attr("id")+'">�� '+$(this).attr("name")+' ('+$(this).attr("days")+'��)</option>';
					});
				}
			  htmllist+='</select>';
			  htmllist2+='<select name="s2" size="12" multiple="multiple" id="s2" style="width:auto;">';
			  if(0<$(ans).find("sel2").size()){
					$(ans).find("sel2").each(function(){
						htmllist2+='<option value="'+$(this).attr("id")+'">�� '+$(this).attr("name")+' ('+$(this).attr("days")+'��)</option>';
					});
				}
			  htmllist2+='</select>';
				$("#loptions").html(htmllist);
				$("#loptions2").html(htmllist2);
				$("#optitle").html($("#clocate"+i).text()+" >> "+$("#cname"+i).text()+" >> �γ̿�Ŀ����");
				$("#aid").html(i);
				showForm("#Lists","#fade");
			}
		},
		complete:function(){
		}
	});
};

var toChangeList=function(){
	var aid=$("#aid").text();
  var c="";
    $("#s2 option").each(function() {
    c+='['+$(this).val()+'],';
  });
  c=c.substr(0,c.length-1);
  var l="";
    $("#s1 option").each(function() {
    l+='['+$(this).val()+'],';
  });
  l=l.substr(0,l.length-1);
	var requests={"question":"ChangeCourseList","aid":aid,"c":c,"l":l};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				$("#submitoperate").attr("disabled",false);
			}
			if(1010==err){
				$("#Operateloading").html("");
				$("#submitoperate").attr("disabled",false);
				hideForm("#Lists","#fade");
				GetAreaCondition();
			}
		},
		complete:function(){
		}
	});
};

var addPriceButton=function(){
	fsi++;
	htmlfeeappend='<li id="fsi'+fsi+'" class="newfee">���ƣ�<input value="" size=8 /> ���<input value="" size=10 /> <input type="button" onclick="cutPriceNButton('+fsi+')" value="  -  " /></li>';
	$("#selfees").append(htmlfeeappend);
};

var ConfirmFee=function(i){
	var terr=0;
	var strOprice=strNprice="";
	$(".orgfee").each(function(){
		if($(this).css('display')!="none"){
			if(isNaN($(this).find("input").eq(1).val()))terr=1;
			strOprice+="@"+$(this).attr("id").substring(3)+"|"+$(this).find("input").eq(0).val()+"|"+$(this).find("input").eq(1).val();
		}
	});strOprice=strOprice.substring(1);
	$(".newfee").each(function(){
		if($(this).css('display')!="none"&&($(this).find("input").eq(1).val()!="")){
			if(isNaN($(this).find("input").eq(1).val()))terr=1;
			strNprice+="@"+$(this).attr("id").substring(3)+"|"+$(this).find("input").eq(0).val()+"|"+$(this).find("input").eq(1).val();
		}
	});strNprice=strNprice.substring(1);
	if(1==terr)$("#Operateloading").html("����ȷ��д���");
	else{
		var requests={"question":"ConfirmFee","id":i,"p":strOprice+"^"+strNprice};
			$.ajax({
			type:'POST',
			url:doUrl,
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
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(2001==err){
					$("#Operateloading").html($(ans).find("answer").attr("note"));
					$("#submitoperate").attr("disabled",false);
				}
				if(1010==err){
					$("#Operateloading").html("");
					hideForm("#Operate","#fade");
					GetAreaCondition();
				}
			},
			complete:function(){
			}
		});
	}
};

var cutPriceButton=function(i){
	$("#fee"+i).hide();
};

var cutPriceNButton=function(i){
	$("#fsi"+i).hide();
};

var AreaPrice=function(i){
	var requests={"question":"GetAreaPrice","id":i};
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				loadings("h");
				var htmlfee0=htmlfee1=htmlfee2="";
				htmlfee0='<li style="font-weight:bold;font-size:13px;">'+$(ans).find("answer").attr("name")+'('+$(ans).find("answer").attr("area")+')</li><hr>';
				htmlfee1+='<ul id="selfees">';
				$(ans).find("fees").each(function(){
					htmlfee1+='<li id="fee'+$(this).attr("feeid")+'" class="orgfee">���ƣ�<input value="'+$(this).attr("feename")+'" size=8 /> ���<input value="'+$(this).attr("feevalue")+'" size=10 /> <input type="button" onclick="cutPriceButton('+$(this).attr("feeid")+')" value="  -  " /></li>';
				});
				htmlfee1+='</ul>';
				htmlfee2+='<li><input type="button" onclick="addPriceButton();" value="  +  " /></li><hr><li><input id="submitoperate" name="input" type="button" onclick="ConfirmFee('+i+');" value="ȷ��" /> <input name="cancel" onclick="CloseW(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
				$("#Operate").html(htmlfee0+htmlfee1+htmlfee2);
				showForm("#Operate","#fade");
			}
		},
		complete:function(){
		}
	});
};

/**************************************************************/
var changeLearnTraceOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetLearnTraceCondition();
	$("#img"+v).show();
};

var displayLearnTraceOrder=function(){
	$("#imgtime").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeLearnTracePage=function(){
	gotoLearnTracePage($("#changeconsultpage").val());
};

var gotoLearnTracePage=function(p){
	consultpage=p;
	GetLearnTraceCondition();
};

var getLearnTraceLocalstaff=function(){
	var requests={"question":"GetLearnStaff","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			if(1==err){
				var isConsult=0;
				
				var htmlselConsult='<option value="0">ȫ��</option>';
				if(0<$(ans).find("staff").size()){
					$(ans).find("staff").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isConsult=1;
							htmlselConsult+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselConsult+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselConsult='<option value="0">��</option>';
				}
				if(0==isConsult){
					Limitconsult=0;
				}
				$("#consult").html(htmlselConsult);
			}
		},
		complete:function(){
			getLearnTraceData();
		}
	});
};

var setLearnTraceLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getLearnTraceLocalstaff();
	$("#search").val("");
	consultkey="";
};

var setLearnTraceLimitConsult=function(){
	Limitconsult=$("#consult").val();
	consultpage=1;
	GetLearnTraceCondition();
	$("#search").val("");
	consultkey="";
};

var setLearnTraceLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetLearnTraceCondition();
	$("#search").val("");
	consultkey="";
};

var LearnTraceSearcher=function(){
	Limitarea=0;
	Limitconsult=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeLearnTraceOrder(consultorderV);
};

var GetLearnTraceCondition=function(){
	var requests={"question":"GetLearnTraceConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setLearnTraceLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">Ա����</span><select id="consult" onchange=setLearnTraceLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("consult").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLearnTraceLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setLearnTraceLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getLearnTraceLocalstaff();
		}
	});
};

var chkLearnTraceDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getLearnTraceData();
};

var getLearnTraceData=function(){
	var requests={"question":"GetLearnTraceData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="18%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeLearnTraceOrder(\'time\');" class="tooltip" title="������ʱ������" >����<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="������ʱ������" /></a> </th>';
					if(1==consultcols){
						htmlthead+='<th width="18%" colspan="3">���� | ��Ա</th>';
					}else{
						htmlthead+='<th width="18%">��Ա</th>';
					}
					htmlthead+='<th width="59%">������Ŀ</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						if(1==consultcols){
							htmltbody+="<td colspan='3'>"+$(this).find("locate").text()+"��"+$(this).find("staff").text()+"��</td>";
						}else {
							htmltbody+='<td>'+$(this).find("staff").text()+"</td>";
						}
						var cusid=$(this).find("sid").text();
						htmltbody+='<td style="text-align:left;text-indent:2em;">'+$(this).find("reputation").text()+'ѧԱ��<a id="stu'+cusid+'" href="javascript:void(0);" onclick="TraceLearnDetail('+cusid+');" style="text-decoration:none;">'+($(this).find("student").text()==""?"δ��":$(this).find("student").text())+'</a>��<span id="stnum'+cusid+'">'+($(this).find("number").text()==""?'':'('+$(this).find("number").text()+')')+'</span>'+$(this).find("traces").text().replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("staff").text()+'</span>')+(""!=$(this).find("comment").text()? '>> <span style="color:#999">'+$(this).find("comment").text()+'</span>':'')+'</td>';
						htmltbody+="</tr>";
					});
				}
				var htmlstatics="";
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoLearnTracePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoLearnTracePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoLearnTracePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoLearnTracePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeLearnTracePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayLearnTraceOrder();
			$('.tooltip').toolTip();
		}
	});
};

var TraceLearnDetail=function(i){
	suid=i;
	GetLearnTraceDetail();
	showForm("#Details","#fade");
};

var GetLearnTraceDetail=function(){
	var requests={"question":"GetLearnTraceDetails","sid":suid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Details").html(htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">ѧԱ<span style="color:blue">'+$("#stu"+suid).text()+$("#stnum"+suid).text()+'</span>��ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span>��';
				var htmldetails="";
				htmldetails+='<hr>';
				htmldetails+='<div>'+stat+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				}
				$(ans).find("trace").each(function(){
					var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
				});
				htmldetails+= '<hr><div><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div>';
				$("#Details").html(htmldetails);
			}
		},
		complete:function(){
			JudgeWindowSizetoCss("#Details");
		}
	});
};

/**************************************************************/
var changeEvalOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetEvalCondition();
	$("#img"+v).show();
};

var displayEvalOrder=function(){
	$("#imgtime").hide();
	$("#imgteacher").hide();
	$("#imgcourse").hide();
	$("#imgclass").hide();
	$("#imgavgcredit").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeEvalPage=function(){
	gotoEvalPage($("#changeconsultpage").val());
};

var gotoEvalPage=function(p){
	consultpage=p;
	GetEvalCondition();
};

var getEvalLocalclass=function(){
	var requests={"question":"GetEvalClass","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var isClass=0;
				var htmlselClass='<option value="0">ȫ��</option>';
				if(0<$(ans).find("class").size()){
					$(ans).find("class").each(function(){
						if(Limitclass==$(this).attr("id")){
							isClass=1;
							htmlselClass+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}else{
							htmlselClass+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}
					});
				}else{
					htmlselClass='<option value="0">��</option>';
				}
				if(0==isClass){
					Limitclass=0;
				}
				$("#class").html(htmlselClass);
			}
		},
		complete:function(){
			getEvalData();
		}
	});
};

var setEvalLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getEvalLocalclass();
	$("#search").val("");
	consultkey="";
};

var setEvalLimitClass=function(){
	Limitclass=$("#class").val();
	consultpage=1;
	GetEvalCondition();
	$("#search").val("");
	consultkey="";
};

var setEvalLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetEvalCondition();
	$("#search").val("");
	consultkey="";
};

var EvalSearcher=function(){
	Limitarea=0;
	Limitclass=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeEvalOrder(consultorderV);
};

var GetEvalCondition=function(){
	var requests={"question":"GetEvalConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setEvalLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("class").size()){
					html+='<label id="selclass"><span style="font-weight:bold;">�༶��</span><select id="class" onchange=setEvalLimitClass();>';
					if(0==Limitclass){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("class").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("class").each(function(){
							if($(this).attr("id")==Limitclass){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("class").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setEvalLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setEvalLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getEvalLocalclass();
		}
	});
};

var chkEvalDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getEvalData();
};

var getEvalData=function(){
	var requests={"question":"GetEvalData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"class":Limitclass,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="15%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeEvalOrder(\'time\');" class="tooltip" title="��ʱ������" >��������<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeEvalOrder(\'teacher\');" class="tooltip" title="����ʦ������" >���⽲ʦ<img id="imgteacher" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ʦ������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeEvalOrder(\'course\');" class="tooltip" title="���γ�������" >�γ�<img id="imgcourse" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���γ�������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeEvalOrder(\'class\');" class="tooltip" title="���༶����" >�ڿΰ༶<img id="imgclass" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���༶����" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeEvalOrder(\'avgcredit\');" class="tooltip" title="��ƽ��������" >ƽ��������<img id="imgavgcredit" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ƽ��������" /></a> </th>';
					htmlthead+='<th width="10%">ִ����</th>';
					htmlthead+='<th width="15%">����</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;">'+$(this).find("teacher").text()+"</span></td>";
						htmltbody+='<td>'+$(this).find("course").text()+"</td>";
						htmltbody+='<td>'+$(this).find("class").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;color:green;">'+$(this).find("avgcredit").text()+"</span></td>";
						htmltbody+='<td>'+$(this).find("operater").text()+"</td>";
						htmltbody+='<td><input type="button" onclick="EvalDetail('+$(this).attr("id")+');" value=" �鿴���� " /></td>';
						htmltbody+="</tr>";
					});
				}
				var htmlstatics="";
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoEvalPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoEvalPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoEvalPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoEvalPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeEvalPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayEvalOrder();
			$('.tooltip').toolTip();
		}
	});
};

var EvalDetail=function(i){
	vid=i;
	GetEvalDetail();
};

var GetEvalDetail=function(){
	var requests={"question":"GetEvalDetails","vid":vid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#EvalDetails").html("���ڼ�����������... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseList(\'EvalDetails\');">�ر�</a>]');
			showForm("#EvalDetails","#fade");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				alert("��ǰ��û������!");
				hideForm("#EvalDetails","#fade");
			}
			if(1==err){
				$("#EvalDetails").html($.base64({data:$(ans).find("answer").attr("evhtml"),type:1}));
				$("#evalclass").html($(ans).find("answer").attr("class"));
				$("#evalteacher").html($(ans).find("answer").attr("teacher"));
				$("#evalcourse").html($(ans).find("answer").attr("course"));
				for(var k=1;k<=20;k++){
					$("#e"+k).html($(ans).find("answer").attr("e"+k));
				}
				for(var j=1;j<=$(ans).find("answer").attr("evcount");j++){
					$("#ev"+j).html($(ans).find("answer").attr("ev"+j));
				}
				for(var l=1;l<=20;l++){
					$("#v"+l).html($(ans).find("answer").attr("vv"+l));
				}
				$("#eva").html($(ans).find("answer").attr("eva"));
				$("#pcount").html($(ans).find("answer").attr("pcount"));
				var EvalBody='<tr><th style="font-weight:bold;" width=10%>ѧԱ</th><th  style="font-weight:bold;" width=30%>����ʦ�Ľ���</th><th style="font-weight:bold;" width=30%>�����Ż����ڿ����ݵĽ���</th><th style="font-weight:bold;" width=30%>�Խ�ѧ/�з����Ļ����Ľ���</th></tr>'; 
				$(ans).find("data").each(function(){
					EvalBody+="<tr>";
					EvalBody+='<td>'+$(this).attr("sname")+'</td>';
					EvalBody+='<td>'+($(this).attr("c1")==""?"-":$.base64({data:$(this).attr("c1"),type:1}))+'</td>';
					EvalBody+='<td>'+($(this).attr("c2")==""?"-":$.base64({data:$(this).attr("c2"),type:1}))+'</td>';
					EvalBody+='<td>'+($(this).attr("c3")==""?"-":$.base64({data:$(this).attr("c3"),type:1}))+'</td>';
					EvalBody+='<td>';
					EvalBody+="</tr>";
				});
				$("#EvalList").html(EvalBody);
				$("#tail").html('<hr><input type="button" value="+ չ��/���������б� +"  onclick="toexEval();"/>');
			}
		},
		complete:function(){
		}
	});
};

var toexEval=function(){
	$("#EvalList").toggle();
};

/**************************************************************/
var changeOccEvalOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetOccEvalCondition();
	$("#img"+v).show();
};

var displayOccEvalOrder=function(){
	$("#imgtime").hide();
	$("#imgstaff").hide();
	$("#imgcourse").hide();
	$("#imgclass").hide();
	$("#imgavgcredit").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeOccEvalPage=function(){
	gotoOccEvalPage($("#changeconsultpage").val());
};

var gotoOccEvalPage=function(p){
	consultpage=p;
	GetOccEvalCondition();
};

var getOccEvalLocalclass=function(){
	var requests={"question":"GetOccEvalClass","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var isClass=0;
				var htmlselClass='<option value="0">ȫ��</option>';
				if(0<$(ans).find("class").size()){
					$(ans).find("class").each(function(){
						if(Limitclass==$(this).attr("id")){
							isClass=1;
							htmlselClass+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}else{
							htmlselClass+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}
					});
				}else{
					htmlselClass='<option value="0">��</option>';
				}
				if(0==isClass){
					Limitclass=0;
				}
				$("#class").html(htmlselClass);
			}
		},
		complete:function(){
			getOccEvalData();
		}
	});
};

var setOccEvalLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getOccEvalLocalclass();
	$("#search").val("");
	consultkey="";
};

var setOccEvalLimitClass=function(){
	Limitclass=$("#class").val();
	consultpage=1;
	GetOccEvalCondition();
	$("#search").val("");
	consultkey="";
};

var setOccEvalLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetOccEvalCondition();
	$("#search").val("");
	consultkey="";
};

var OccEvalSearcher=function(){
	Limitarea=0;
	Limitclass=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeOccEvalOrder(consultorderV);
};

var GetOccEvalCondition=function(){
	var requests={"question":"GetOccEvalConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setOccEvalLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("class").size()){
					html+='<label id="selclass"><span style="font-weight:bold;">�༶��</span><select id="class" onchange=setOccEvalLimitClass();>';
					if(0==Limitclass){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("class").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("class").each(function(){
							if($(this).attr("id")==Limitclass){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("class").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setOccEvalLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setOccEvalLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getOccEvalLocalclass();
		}
	});
};

var chkOccEvalDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getOccEvalData();
};

var getOccEvalData=function(){
	var requests={"question":"GetOccEvalData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"class":Limitclass,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="15%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeOccEvalOrder(\'time\');" class="tooltip" title="��ʱ������" >��������<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeOccEvalOrder(\'staff\');" class="tooltip" title="��ְҵ�滮ʦ������" >ְҵ�滮ʦ<img id="imgstaff" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ְҵ�滮ʦ������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeOccEvalOrder(\'course\');" class="tooltip" title="���γ�������" >�γ�<img id="imgcourse" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���γ�������" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeOccEvalOrder(\'class\');" class="tooltip" title="���༶����" >�ڿΰ༶<img id="imgclass" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���༶����" /></a> </th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeOccEvalOrder(\'avgcredit\');" class="tooltip" title="��ƽ��������" >ƽ��������<img id="imgavgcredit" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ƽ��������" /></a> </th>';
					htmlthead+='<th width="15%">����</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;">'+$(this).find("staff").text()+"</span></td>";
						htmltbody+='<td>'+$(this).find("course").text()+"</td>";
						htmltbody+='<td>'+$(this).find("class").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;color:green;">'+$(this).find("avgcredit").text()+"</span></td>";
						htmltbody+='<td><input type="button" onclick="OccEvalDetail('+$(this).attr("id")+');" value=" �鿴���� " /></td>';
						htmltbody+="</tr>";
					});
				}
				var htmlstatics="";
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoOccEvalPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoOccEvalPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoOccEvalPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoOccEvalPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeOccEvalPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayOccEvalOrder();
			$('.tooltip').toolTip();
		}
	});
};

var OccEvalDetail=function(i){
	vid=i;
	GetOccEvalDetail();
};

var GetOccEvalDetail=function(){
	var requests={"question":"GetOccEvalDetails","vid":vid};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#OccEvalDetails").html("���ڼ�����������... "+htmlimgo+' [<a href="javascript:void(0);" onclick="CloseList(\'OccEvalDetails\');">�ر�</a>]');
			showForm("#OccEvalDetails","#fade");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				alert("��ǰ��û������!");
				hideForm("#OccEvalDetails","#fade");
			}
			if(1==err){
				$("#OccEvalDetails").html($.base64({data:$(ans).find("answer").attr("evhtml"),type:1}));
				$("#occevalclass").html($(ans).find("answer").attr("class"));
				$("#occevalstaff").html($(ans).find("answer").attr("staff"));
				$("#occevalcourse").html($(ans).find("answer").attr("course"));
				for(var k=1;k<=20;k++){
					$("#occe"+k).html($(ans).find("answer").attr("e"+k));
				}
				for(var j=1;j<=$(ans).find("answer").attr("evcount");j++){
					$("#occev"+j).html($(ans).find("answer").attr("ev"+j));
				}
				for(var l=1;l<=20;l++){
					$("#v"+l).html($(ans).find("answer").attr("vv"+l));
				}
				$("#occeva").html($(ans).find("answer").attr("eva"));
				$("#occpcount").html($(ans).find("answer").attr("pcount"));
				var EvalBody='<tr><th style="font-weight:bold;" width=25%>ѧԱ</th><th  style="font-weight:bold;" width=35%>����ʦ�Ľ���</th><th style="font-weight:bold;" width=40%>�����Ż����ڿ����ݵĽ���</th></tr>'; 
				$(ans).find("data").each(function(){
					EvalBody+="<tr>";
					EvalBody+='<td>'+$(this).attr("sname")+'</td>';
					EvalBody+='<td>'+($(this).attr("c1")==""?"-":$.base64({data:$(this).attr("c1"),type:1}))+'</td>';
					EvalBody+='<td>'+($(this).attr("c2")==""?"-":$.base64({data:$(this).attr("c2"),type:1}))+'</td>';
					EvalBody+='<td>';
					EvalBody+="</tr>";
				});
				$("#OccEvalList").html(EvalBody);
				$("#occtail").html('<hr><input type="button" value="+ չ��/���������б� +"  onclick="toexOccEval();"/>');
			}
		},
		complete:function(){
		}
	});
};

var toexOccEval=function(){
	$("#OccEvalList").toggle();
};

/**************************************************************/
var changeRuleOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetRuleCondition();
	$("#img"+v).show();
};

var displayRuleOrder=function(){
	$("#imgtime").hide();
	$("#imgteacher").hide();
	$("#imgadvicer").hide();
	$("#imgclass").hide();
	$("#imgrulecate").hide();
	$("#imgruledate").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeRulePage=function(){
	gotoRulePage($("#changeconsultpage").val());
};

var gotoRulePage=function(p){
	consultpage=p;
	GetRuleCondition();
};

var getRuleLocalclass=function(){
	var requests={"question":"GetRuleClass","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var isClass=0;
				var htmlselClass='<option value="0">ȫ��</option>';
				if(0<$(ans).find("class").size()){
					$(ans).find("class").each(function(){
						if(Limitclass==$(this).attr("id")){
							isClass=1;
							htmlselClass+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}else{
							htmlselClass+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						}
					});
				}else{
					htmlselClass='<option value="0">��</option>';
				}
				if(0==isClass){
					Limitclass=0;
				}
				$("#class").html(htmlselClass);
				var isStaff=0;
				var htmlselStaff='<option value="0">ȫ��</option>';
				if(0<$(ans).find("consult").size()){
					$(ans).find("consult").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isStaff=1;
							htmlselStaff+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselStaff+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselStaff='<option value="0">��</option>';
				}
				if(0==isStaff){
					Limitconsult=0;
				}
				$("#consult").html(htmlselStaff);
			}
		},
		complete:function(){
			getRuleData();
		}
	});
};

var setRuleLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getRuleLocalclass();
	$("#search").val("");
	consultkey="";
};

var setRuleLimitClass=function(){
	Limitclass=$("#class").val();
	Limitconsult=0;
	consultpage=1;
	GetRuleCondition();
	$("#search").val("");
	consultkey="";
};

var setRuleLimitStatus=function(c){
	consultpage=1;
	Limitstatus=c;
	GetRuleCondition();
	$("#search").val("");
	consultkey="";
};

var setRuleLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetRuleCondition();
	$("#search").val("");
	consultkey="";
};

var RuleSearcher=function(){
	Limitarea=0;
	Limitclass=0;
	Limitconsult=0;
	Limitdate="all";
	Limitstatus="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeRuleOrder(consultorderV);
};

var GetRuleCondition=function(){
	var requests={"question":"GetRuleConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">������</span><select id="area" onchange=setRuleLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("class").size()){
					html+='<label id="selclass"><span style="font-weight:bold;">�༶��</span><select id="class" onchange=setRuleLimitClass();>';
					if(0==Limitclass){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("class").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("class").each(function(){
							if($(this).attr("id")==Limitclass){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+' >>'+$(this).attr("cdate")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">Ա����</span><select id="consult" onchange=setRuleLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("class").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("status").size()){
					if('all'==Limitstatus){
						html+='<span style="font-weight:bold;">���ͣ�</span><a class="active" href="javascript:void(0);" onclick=setRuleLimitStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setRuleLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						});
					}else{
						html+='<span style="font-weight:bold;">���ͣ�</span><a href="javascript:void(0);" onclick=setRuleLimitStatus(\'all\');>ȫ��</a>';
						$(ans).find("status").each(function(){
							if($(this).attr("id")==Limitstatus){
								html+='<a class="active" id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setRuleLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}else{
								html+='<a id="status'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setRuleLimitStatus(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							}
						});
					}
					html+=htmlhr;
				}
				$("#status").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setRuleLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setRuleLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getRuleLocalclass();
		}
	});
};

var setRuleLimitConsult=function(){
	Limitconsult=$("#consult").val();
	Limitclass=0;
	consultpage=1;
	GetRuleCondition();
	$("#search").val("");
	consultkey="";
};

var chkRuleDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getRuleData();
};

var getRuleData=function(){
	var requests={"question":"GetRuleData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"class":Limitclass,"consult":Limitconsult,"status":Limitstatus,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					var colorCreditA,colorCreditD;
					htmlthead+='<tr>';
					htmlthead+='<th width="15%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeRuleOrder(\'time\');" class="tooltip" title="��ʱ������" >��¼ʱ��<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ʱ������" /></a> </th>';
					htmlthead+='<th width="5%">ѧԱ</th>';
					htmlthead+='<th width="12%">��ǰ����</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeRuleOrder(\'class\');" class="tooltip" title="���༶����" >�༶<img id="imgclass" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���༶����" /></a> </th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeRuleOrder(\'advicer\');" class="tooltip" title="��������������" >������<img id="imgadvicer" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��������������" /></a> </th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeRuleOrder(\'teacher\');" class="tooltip" title="����ʦ������" >��ʦ<img id="imgteacher" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ʦ������" /></a> </th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeRuleOrder(\'rulecate\');" class="tooltip" title="��Υ����������" >Υ������<img id="imgrulecate" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��Υ����������" /></a> </th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeRuleOrder(\'ruledate\');" class="tooltip" title="��Υ����������" >Υ��ʱ��<img id="imgruledate" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��Υ����������" /></a> </th>';
					htmlthead+='<th width="15%">����</th>';
					htmlthead+='<th width="7%">ִ����</th>';
					htmlthead+='<th width="5%">����</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						colorCreditA=colorCreditD='#00BFFF';
						var creditA = parseInt($(this).find("credit0").text());
						var creditD = parseInt($(this).find("credit1").text());
						if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
						if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
						if(creditA < 60)colorCreditA='#FF0000';
						if(creditD < 60)colorCreditD='#FF0000';
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;">'+$(this).find("student").text()+"</span></td>";
						htmltbody+="<td><span style='font-size:8pt;font-weight:normal;padding:1px;color:#FFF;background-color:"+colorCreditA+";border-radius:3px;'>����"+creditA+"</span> <span style='font-size:8pt;font-weight:normal;padding:1px 2px 1px 2px;color:#FFF;background-color:"+colorCreditD+";border-radius:3px;'>����"+creditD+"</span></td>";
						htmltbody+='<td>'+$(this).find("class").text()+"</td>";
						htmltbody+='<td>'+$(this).find("advicer").text()+"</td>";
						htmltbody+='<td>'+$(this).find("teacher").text()+"</td>";
						htmltbody+='<td>'+$(this).find("category").text()+"</td>";
						htmltbody+='<td style="color:#00BFCC;">'+$(this).find("ruledate").text()+"</td>";
						htmltbody+='<td style="font-size:10px;">'+$(this).find("comment").text()+"</td>";
						htmltbody+='<td>'+$(this).find("dealer").text()+"</td>";
						htmltbody+='<td>'+(0<$(this).find("deal").text()?'<input type="button" onclick="if(confirm(\'�Ƿ�ȷ��Ҫɾ������Υ�ͣ�\')) RuleDel('+$(this).attr("id")+');" value=" ɾ�� " />':'-')+'</td>';
						htmltbody+="</tr>";
					});
				}
				if(0<$(ans).find("selfclass").size()){
					var htmlselfclass='<ul><span style="font-weight:bold;padding:3px 12px 3px 12px;color:#FFF;background-color:#319fcc;border-radius:4px;">�ҵİ༶</span>';
					$(ans).find("selfclass").each(function(){
						htmlselfclass+='<li><a '+($(this).attr("cid")==Limitclass?"class='myclasses'":"")+' href="javascript:void(0);" onclick=jumpRuleSelfClass('+$(this).attr("cid")+');>'+$(this).attr("cname")+'</a></li>';
					});htmlselfclass+='</ul>';
					$("#myclasses").html(htmlselfclass);
					$("#myclasses").show();
				}
				var htmlstatics="";
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoRulePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoRulePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoRulePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoRulePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeRulePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayRuleOrder();
			$('.tooltip').toolTip();
		}
	});
};

var jumpRuleSelfClass=function(c){
	Limitarea=0;
	Limitclass=c;
	Limitconsult=0;
	consultpage=1;
	GetRuleCondition();
	$("#search").val("");
	consultkey="";
	$("#statics").hide();
};

var RuleDel=function(i){
	var requests={"question":"RuleDel","rid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
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
			}
			if(1010==err){
				GetRuleCondition();
			}
		},
		complete:function(){
		}
	});
};

/****************************************************************/
var getMessageData=function(){
	var requests={"question":"GetMessageData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="5" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="17%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeMessageOrder(\'time\');" class="tooltip" class="tooltip" title="��������������" >��������<img id="imgtime" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��������������" /></a></th>';
					htmlthead+='<th width="10%">������</th>';
					htmlthead+='<th width="65%">��Ϣ����</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeMessageOrder(\'stat\');" class="tooltip" title="��״̬����" >״̬<img id="imgstat" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��״̬����"/></a></th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("id");
						var sid=$(this).find("sid").text();
						var scolor="";
						if(sid==0)scolor="red";if(sid==1)scolor="green";
						htmltbody+="<tr id='message"+dataid+"' class='cmessage'>";
						htmltbody+='<td>'+$(this).find("time").text()+'</td>';
						htmltbody+="<td>"+$(this).find("msgfrom").text()+"</td>";
						htmltbody+="<td style='text-align:left;text-indent:2em;line-height:22px;padding:6px 0 6px 0;'>"+$(this).find("content").text()+"</td>";
						htmltbody+='</td><td><span style="color:'+scolor+'">'+$(this).find("stat").text()+'</span></td>';
						htmltbody+="</tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoMessagePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoMessagePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoMessagePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoMessagePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeMessagePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
				if(0<$(ans).find("pub").attr("content"))$('#tomessage').html('<hr style="border:1px dashed #ccc;"><input id="newmessage" type="button" value="������֪ͨ" onclick=AddMessage(); />');
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayMessageOrder();
			$('.tooltip').toolTip();
		}
	});
};

var AddMessage=function(){
	$("#Operate").html("");
	var htmlOperate="";
	htmlOperate+='<li style="text-align:left;font-weight:bold;font-size:14px;">֪ͨ���� >></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;">�ڡ��ݣ�<textarea cols="51" id="OperateComment" style="width:80%; height: 50px"></textarea></li>';
	htmlOperate+='<hr style="border:1px dashed #ccc;"><li style="text-align:left;"><<< �����ˣ�<label id="destperson"></label><input id="addperson" type="button" value=" + " onclick="OpenList();" /></li>';
	htmlOperate+='<li><hr style="border:1px dashed #ccc;"><input id="submitoperate" name="input" type="button" onclick="PublicMsg();" value="����" /> <input name="cancel" onclick="CloseList(\'Operate\');" type="button" value="ȡ��" /><span id="Operateloading"></span></li>';
	$("#Operate").html(htmlOperate);
	showForm("#Operate","#fade");
};

var PublicMsg=function(){
	var PersonList="";
	var pubMsg=$("#OperateComment").attr("value");
	$($(".persons")).each(function(){ 
		if($(this).attr("checked"))PersonList+=$(this).attr("value")+";";
	});
	var requests={"question":"PublicMsg","persons":PersonList,"content":pubMsg};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#plist").html(htmlimgo);
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
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(2002==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
				OpenList();
			}
			if(1010==err){
				alert("֪ͨ�����ɹ���");
				hideForm("#Operate","#fade");
				hideForm("#Lists","#fade");
				getMessageData();
			}
		},
		complete:function(){
		}
	});
};

var OpenList=function(){
	var htmlList="";
	htmlList+='<hr><li><label style="font-weight:bold;color:blue;"><input id="permitlist" type="checkbox" onclick="selAllPermitList();" />ȫ��Ա��</label></li>';
	htmlList+='<hr style="border:1px dashed #ccc;">';
	htmlList+='<ul id="plist"></ul>';
	htmlList+='<hr>';
	$("#Lists").html(htmlList);
	GetPermits();
	showForm("#Lists");
};

var CloseList=function(i){
	hideForm("#"+i,"#fade");
	hideForm("#Lists","#fade");
};

var GetPermits=function(){
	var requests={"question":"GetPermits"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#plist").html(htmlimgo);
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#plist").html("");
				var htmlplist="";
				var permitname="";
				$(ans).find("permit").each(function(){
					permitname = $(this).attr("name");
					htmlplist+='<li><label style="font-weight:bold;"><input id="permitlist'+permitname+'" name="permitlist" type="checkbox" onclick="selAllpersonList(\''+permitname+'\');" />'+$(this).attr("name")+' >>></label></li>';
					htmlplist+='<li class="liperlist" id="'+$(this).attr("name")+'" style="display:none;">';
					$(this).find("person").each(function(){
						htmlplist+='<label style="color:#999;"><input class="persons" name="personlist'+permitname+'" type="checkbox" value="'+$(this).attr("id")+'" />'+$(this).attr("name")+'��</label>';
					});
					htmlplist+='</li>';
					htmlplist+='<hr style="border:1px dashed #ccc;">';
				});
				$("#plist").html(htmlplist);
			}
		},
		complete:function(){
		}
	});
};

var selAllPermitList=function(){
	if($("#permitlist").attr("checked")){
		$("input[name='permitlist']").attr("checked",true);
		$(".liperlist").show();
		$($("input[name='permitlist']")).each(function(){ 
		selPermitToPerson($(this).attr("id").replace("permitlist",""));
		});
	}else{
		$("input[name='permitlist']").attr("checked",false);
		$(".liperlist").hide();
		$(".persons").attr("checked",false);
	}
};

var selAllpersonList=function(n){
	if(0<$("input[name='permitlist']:checkbox").not("input:checked").length)$("#permitlist").attr("checked",false);
	else $("#permitlist").attr("checked",true);
	selPermitToPerson(n);
};

var selPermitToPerson=function(n){
	if($("#permitlist"+n+"").attr("checked")){
		$("#"+n).show();
		$('input[name="personlist'+n+'"]').attr("checked",true);
	}else{
		$("#"+n).hide();	
		$('input[name="personlist'+n+'"]').attr("checked",false);
	}
};

var gotoMessagePage=function(p){
	consultpage=p;
	getMessageData();
};

var changeMessagePage=function(){
	gotoMessagePage($("#changeconsultpage").val());
};

var displayMessageOrder=function(){
	$("#imgtime").hide();
	$("#imgstat").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeMessageOrder=function(v){
	$("#imgtime").hide();
	$("#imgstat").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	getMessageData();
	$("#img"+v).show();
};

var MessageSearcher=function(){
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeMessageOrder(consultorderV);
};

/****************************************************************/
var setDeirectoryLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	consultkey="";
	$("#search").val("");
	GetDirectoryCondition();
};

var GetDirectoryCondition=function(){
	var requests={"question":"GetDirectoryConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">��ҵ������</span><select id="area" onchange=setDeirectoryLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">��ְ���ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setDirectoryLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setDirectoryLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getDirectoryData();
		}
	});
};

var setDirectoryLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	consultkey="";
	$("#search").val("");
	GetDirectoryCondition();
};

var getDirectoryData=function(){
	var requests={"question":"GetDirectoryData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,"area":Limitarea,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
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
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				var htmldirectionInfoRate='';
				var htmldirectionInfo='<span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">ƽ��н�� >>></span><p style="margin-bottom:6px;margin-top:4px;">'+($(ans).find("answer").attr("avgs")==""?"��":$(ans).find("answer").attr("avgs"))+'</p>';
				htmldirectionInfo+='<span style="font-size:12px;padding:3px 10px 3px 10px;color:#666;background-color:#CCC;border-radius:4px;">һ�߳���</span><p style="margin-bottom:6px;margin-top:4px;">'+($(ans).find("answer").attr("avgsfirst")==""?"��":$(ans).find("answer").attr("avgsfirst"))+'</p>';
				$(ans).find("firstlist").each(function(){
					htmldirectionInfo+='<p style="margin-bottom:6px;margin-top:4px;font-size:8pt;">'+($(this).attr("city")+$(this).attr("avgs"))+'</p>';
				});
				htmldirectionInfo+='<span style="font-size:12px;padding:3px 10px 3px 10px;color:#666;background-color:#CCC;border-radius:4px;">��������</span><p style="margin-bottom:6px;margin-top:4px;">'+($(ans).find("answer").attr("avgsother")==""?"��":$(ans).find("answer").attr("avgsother"))+'</p>';
				$(ans).find("secondlist").each(function(){
					htmldirectionInfo+='<p style="margin-bottom:6px;margin-top:4px;font-size:8pt;">'+($(this).attr("city")+$(this).attr("avgs"))+'</p>';
				});
				if(0<$(ans).find("emp").attr("isRate")){
					htmldirectionInfoRate='<span style="font-weight:bold;font-size:12px;padding:3px 10px 3px 10px;color:#FFF;background-color:#00b6cf;border-radius:4px;">��ҵ�� >>></span><p style="margin-bottom:6px;margin-top:4px;text-decoration:underline;">'+$(ans).find("emp").attr("rate")+'</p>';
					if(Limitdate!='all')htmldirectionInfoRate+='<span style="font-size:12px;padding:3px 10px 3px 10px;color:#666;background-color:#CCC;border-radius:4px;">������</span><p style="margin-bottom:6px;margin-top:4px;text-decoration:underline;">'+$(ans).find("emp").attr("checkrate")+'</p>';
				}htmldirectionInfo+=htmldirectionInfoRate;
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th colspan="5" width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="10%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeDirectoryOrder(\'time\');" class="tooltip" class="tooltip" title="����ְ��������" >��ְ����<img id="imgtime" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ְ��������" /></a></th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeDirectoryOrder(\'name\');" class="tooltip" title="����������" >����<img id="imgname" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����������"/></a></th>';
					htmlthead+='<th width="10%">ԺУ</th>';
					htmlthead+='<th width="10%">�����༶</th>';
					htmlthead+='<th width="15%"><a href="javascript:void(0);" onclick="changeDirectoryOrder(\'company\');" class="tooltip" title="����˾������" >��ְ��˾<img id="imgcompany" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����˾������"/></a></th>';
					htmlthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeDirectoryOrder(\'jobarea\');" class="tooltip" title="����ҵ��������" >����<img id="imgjobarea" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="����ҵ��������"/></a></th>';
					htmlthead+='<th width="12%">ְλ</th>';
					htmlthead+='<th width="8%"><a href="javascript:void(0);" onclick="changeDirectoryOrder(\'fee\');" class="tooltip" title="��н������" >��ְн��<img id="imgfee" src="img/s_asc.gif" border="0" width="8px" height="6px" class="tooltip" title="��н������"/></a></th>';
					htmlthead+='<th width="8%">������н��</th>';
					htmlthead+='<th width="10%">��ע</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						var dataid=$(this).attr("eid");
						htmltbody+="<tr id='directory"+dataid+"' class='cmessage'>";
						htmltbody+='<td>'+$(this).find("cdate").text()+'</td>';
						htmltbody+='<td style="font-weight:bold;">'+$(this).find("name").text()+'<font class="op"> <a href="javascript:void(0);" onclick="DirectoryDetail('+$(this).find("stuid").text()+');">����</a></font></td>';
						htmltbody+='<td>'+$(this).find("college").text()+'</td>';
						htmltbody+='<td>'+$(this).find("class").text()+'</td>';
						htmltbody+='<td style="font-weight:bold;">'+$(this).find("company").text()+'</td>';
						htmltbody+='<td>'+($(this).find("area").text()==""?"-":$(this).find("area").text())+'</td>';
						htmltbody+='<td>'+($(this).find("posite").text()==""?"-":$(this).find("posite").text())+'</td>';
						htmltbody+='<td>'+$(this).find("fee").text()+'</td>';
						htmltbody+='<td>'+($(this).find("fee0").text()=='��0.00'?'-':$(this).find("fee0").text())+'</td>';
						htmltbody+='<td>'+($(this).find("comm").text()==""?"-":$(this).find("comm").text())+'</td>';
						htmltbody+="</tr>";
					});
				}
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoDirectoryPage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoDirectoryPage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoDirectoryPage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoDirectoryPage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeDirectoryPage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmldirectionInfo);
			if($(ans).find("answer").attr("avgs")=="")$("#statics").hide();
			else $("#statics").show();
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayDirectoryOrder();
			$('.tooltip').toolTip();
		}
	});
};

var DirectoryDetail=function(i){
	showForm("#Details","#fade");
	var requests={"question":"GetStudentDetails","type":"SDetail","suid":i};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			$("#Details").html(htmlimgo+' ������... <input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" />');
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				$("#Details").html("");
				var stat=$(ans).find("status").text()==""?"":'<span style="font-weight:bold;">��ǰ״̬��</span><span style="color:blue;">'+$(ans).find("status").text()+'</span><span>'+($(ans).find("class").text()==''?'':'��'+$(ans).find("class").text()+'��')+'</span>��';
				var cname=$(ans).find("name").text()==""?"":'<span style="font-weight:bold;">������</span><span style="font-weight:bold;color:blue;">'+$(ans).find("name").text()+'</span>��';
				var snumber=$(ans).find("snumber").text()==""?"":'<span style="font-weight:bold;">ѧ�ţ�</span>'+$(ans).find("snumber").text()+'��';
				var csex=$(ans).find("sex").text()==""?"":'<span style="font-weight:bold;">�Ա���</span>'+$(ans).find("sex").text()+'��';
				var ctel=$(ans).find("tel").text()==""?"":'<span style="font-weight:bold;">�绰��</span>'+$(ans).find("tel").text()+'��';
				var cim=$(ans).find("im").text()==""?"":'<span style="font-weight:bold;">QQ��</span>'+$(ans).find("im").text()+'��';
				var cemergname=$(ans).find("semergname").text()==""?"":'<span style="font-weight:bold;">������ϵ�ˣ�</span>'+$(ans).find("semergname").text()+'��';
				var cemergtel=$(ans).find("semergtel").text()==""?"":'<span style="font-weight:bold;">��ϵ�˵绰��</span>'+$(ans).find("semergtel").text()+'��';
				var cstyle=$(ans).find("style").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">��ѯ��ʽ��</span>'+$(ans).find("style").text()+'��';
				var ctender=$(ans).find("tender").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ѧ������</span>'+$(ans).find("tender").text()+'��';
				var cfoundate=$(ans).find("foundate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">������</span>'+$(ans).find("foundate").text()+'��';
				var ceducate=$(ans).find("educate").text()=="��ѡ��"?"":'<br/><span style="font-weight:bold;">ѧ����</span>'+$(ans).find("educate").text()+'��';
				var ccollege=$(ans).find("college").text()==""?"":'<span style="font-weight:bold;">��ҵԺУ��</span>'+$(ans).find("college").text()+'��';
				var cprof=$(ans).find("prof").text()==""?"":'<span style="font-weight:bold;">��ѧרҵ��</span>'+$(ans).find("prof").text()+'��';
				var carea=$(ans).find("area").text()=="��ѡ��"?"":'<br /><span style="font-weight:bold;">������</span>'+$(ans).find("area").text()+'��';
				var ccurrent=$(ans).find("current").text()=="��ѡ��"?"":'<span style="font-weight:bold;">Ŀǰ״����</span>'+$(ans).find("current").text()+'��';
				var cfrom=$(ans).find("from").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��Դ��</span>'+$(ans).find("from").text()+'��';
				var ckeyword=$(ans).find("keyword").text()==""?"":'<span style="font-weight:bold;">�����ؼ��ʣ�</span>'+$(ans).find("keyword").text()+'��';
				var crefer=$(ans).find("refer").text()==""?"":'<br /><span style="font-weight:bold;">�����ˣ�</span>'+$(ans).find("refer").text()+'��';
				var ccomment=$(ans).find("comment").text()==""?"":'<br /><span style="font-weight:bold;">��ѯҪ�㣺</span>'+$(ans).find("comment").text()+'��';
				var ccreditid=$(ans).find("creditid").text()==""?"":'<span style="font-weight:bold;">֤�����룺</span>'+$(ans).find("creditid").text()+'��';
				var cfeeway=$(ans).find("feeway").text()=="��ѡ��"?"":'<span style="font-weight:bold;">�ɿ���ʽ��</span>'+$(ans).find("feeway").text()+'��';
				var cgraduate=$(ans).find("graduate").text()=="��ѡ��"?"":'<span style="font-weight:bold;">��ҵ���ݣ�</span>'+$(ans).find("graduate").text()+'�ꣻ';
				var htmldetails="";
				htmldetails+='<div style="float:right;"><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div><hr>';
				htmldetails+='<div>'+cname+stat+snumber+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;">';
				htmldetails+='<div>'+csex+ctel+cim+cemergname+cemergtel+cfoundate+ceducate+ccollege+cprof+cgraduate+carea+ccurrent+'</div>';
				htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				htmldetails+='<li>'+ccreditid+cfeeway+'</li>';
				if(0<$(ans).find("pay").size()){
					var StrTopay=($(ans).find("pay").attr("topay").indexOf("-") >= 0)?'<span style="color:#B45F04;">�������'+$(ans).find("pay").attr("topay").replace("-","")+'</span>':'<span style="color:Red">�����'+$(ans).find("pay").attr("topay")+'</span>';
					htmldetails+='<li style="font-weight:bold;">Ӧ���ܷ��ã�'+$(ans).find("pay").attr("total")+'��<span style="color:green">�ѽ��'+$(ans).find("pay").attr("paid")+'</span>��'+StrTopay+'</li>';
					htmldetails+='<hr style="border:1px dashed #ccc;"><ul style="color:#666;">';
				}
				if(0<$(ans).find("listdata").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC6699;border-radius:4px;">��ѧ��̸��Ϣ��</span><li/>';
					var htmlentrancelist='<table width="100%" cellpadding="0" cellspacing="1" style="border:1px #CCC solid;text-align:center;"><tr><th width="5%" style="background-color:#DDD;"></th><th colspan="7" style="background-color:#DDD;font-weight:bold;line-height:18px;">��ҵ����</th><th colspan="4" style="background-color:#DDD;font-weight:bold;line-height:18px;">��������</th></tr>';
					htmlentrancelist+='<tr style="line-height:18px;background-color:#ccc;"><td style="font-weight:bold;">��¼��</td><td style="font-weight:bold;">�Ը�</td><td style="font-weight:bold;">��ͨ����</td><td style="font-weight:bold;">��̬</td><td style="font-weight:bold;">��ҵ�뷨</td><td style="font-weight:bold;">֮ǰ����</td><td style="font-weight:bold;">���۽���</td><td style="font-weight:bold;">��ע</td><td style="font-weight:bold;">��������</td><td style="font-weight:bold;">��������</td><td style="font-weight:bold;">���۽���</td><td style="font-weight:bold;">��ע</td></tr>';
					$(ans).find("listdata").each(function(){
						htmlentrancelist+='<tr style="line-height:18px;"><td style="background-color:#DDD;">'+$(this).find("uname").text()+'</td><td style="background-color:#DDD;">'+$(this).find("character").text()+'</td><td style="background-color:#DDD;">'+$(this).find("communicate").text()+'</td><td style="background-color:#DDD;">'+$(this).find("mentality").text()+'</td><td style="background-color:#DDD;">'+$(this).find("thought").text()+'</td><td style="background-color:#DDD;">'+$(this).find("experience").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_S").text()+'</td><td style="background-color:#DDD;">'+$(this).find("language").text()+'</td><td style="background-color:#DDD;">'+$(this).find("project").text()+'</td><td style="background-color:#DDD;">'+$(this).find("suggest_T").text()+'</td><td style="background-color:#DDD;">'+$(this).find("comment_T").text()+'</td></tr>';
					});
					htmlentrancelist+='</table>';
					htmldetails+=htmlentrancelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("dayoff").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC6633;border-radius:4px;">���ټ�¼��</span></li>';
					htmldetails+='<li style="font-weight:bold;">>>> ���١�'+$(ans).find("dayoff").attr("count")+'���Σ��ۼơ�'+(parseInt($(ans).find("dayoff").attr("limit"))<parseInt($(ans).find("dayoff").attr("length"))?'<span style="color:red;">'+$(ans).find("dayoff").attr("length")+'</span>':$(ans).find("dayoff").attr("length"))+'��Сʱ</li>';
					if(0<$(ans).find("dayofflists").size()){
						$(ans).find("dayofflists").each(function(){
							htmldetails+='<li>'+$(this).attr("ddate")+'��'+$(this).attr("length")+'��Сʱ��'+$(this).attr("user")+'��>>> '+$(this).attr("comm")+'</li>'
						});
					}htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("studycredit").size()){
					var colorCreditA=colorCreditD='#00BFFF';
					var creditA = parseInt($(ans).find("studycredit").attr("attence"));
					var creditD = parseInt($(ans).find("studycredit").attr("discipline"));
					if(creditA >=60 && creditA < 80)colorCreditA='#FFBF00';
					if(creditD >=60 && creditD < 70)colorCreditD='#FFBF00';
					if(creditA < 60)colorCreditA='#FF0000';
					if(creditD < 60)colorCreditD='#FF0000';
					htmldetails+='<li><span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditA+';border-radius:4px;">���� '+creditA+'</span> <span style="font-size:20px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:'+colorCreditD+';border-radius:4px;">���� '+creditD+'</span></li><hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("resexam").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#319fcc;border-radius:4px;">���Գɼ���</span></li>';
					var htmlexamlist='<li>';
					$(ans).find("resexam").each(function(){
						htmlexamlist+='<label style="margin-right:10px;"><span style="color:#319fcc;font-weight:bold;">'+$(this).find("ename").text()+'��</span><span style="font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;">'+$(this).find("result").text()+'��ѡ���жϣ�</span>��</label>';
					});
					htmlexamlist+='</li>';
					htmldetails+=htmlexamlist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("assess").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#29C797;border-radius:4px;">�׶��ܽ᣺</span><li/>';
					var htmlassesslist='';
					$(ans).find("assess").each(function(){
						htmlassesslist+='<li><span style="color:#319fcc;">'+$(this).find("atime").text()+'��'+$(this).find("acourse").text()+'��'+$(this).find("auser").text()+'</span> >>> <div style="text-indent:2em;">'+($.base64({data:$(this).find("atext").text(),type:1})+($(this).find("acomm").text()==""?"":"��"+$.base64({data:$(this).find("acomm").text(),type:1})+"��"))+'</div></li>';
					});htmldetails+=htmlassesslist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("weekly").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#22A334;border-radius:4px;">ѧϰ�ܱ���</span><li/>';
					var htmlrulelist='';
					$(ans).find("weekly").each(function(){
						htmlrulelist+='<li><span>'+$(this).find("wtime").text()+'��'+$(this).find("wtype").text()+'��'+$(this).find("wDate").text()+'�� '+$(this).find("wcourse").text()+' �ܱ�</span> >> <a style="color:#08971B;text-decoration: none;" href="javascript:void(0); onclick=checkStuWeekly('+$(this).attr("id")+');">[ �鿴 ]</a></li>';
					});htmldetails+=htmlrulelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("rules").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#ff0000;border-radius:4px;">Υ�ͼ�¼��</span></li>';
					var htmlrulelist='';
					$(ans).find("rules").each(function(){
						htmlrulelist+='<li><span>'+$(this).find("rtime").text()+'</span> >>> <span style="color:#FE642E;font-weight:bold;">'+$(this).find("rname").text()+'��</span><span style="color:#00b6cf;">��'+$(this).find("ruledate").text()+'��</span>'+$(this).find("rcomment").text()+'</li>';
					});htmldetails+=htmlrulelist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("jobtrain").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#F7BE81;border-radius:4px;">��ҵ����Ϣ��</span></li>';
					var htmljobtraininglist='��ҵ�α��Գɼ���'+(""==$(ans).find("jobtrain").attr("credit")?"<span style='color:#999;'>����</span>":"<span style='font-size:16px;font-weight:bold;padding:2px 4px 2px 4px;color:#FFF;background-color:#319fcc;border-radius:2px;'>"+$(ans).find("jobtrain").attr("credit"))+"</span>"+'<br/>������ҵ������'+(""==$(ans).find("jobtrain").attr("area")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("area"))+'��&nbsp;&nbsp;��������������'+(""==$(ans).find("jobtrain").attr("jobxp")?"<span style='color:#999;'>����</span>":$(ans).find("jobtrain").attr("jobxp"));
					htmldetails+=htmljobtraininglist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				if(0<$(ans).find("interview").size()){
					htmldetails+='<li><span style="font-weight:bold;padding:0 2px 0px 4px;color:#FFF;background-color:#CC22CC;border-radius:4px;">ģ�����Լ�¼��</span></li>';
					var htmlinterviewlist='';
					$(ans).find("interview").each(function(){
						htmlinterviewlist+='<li>>>> ['+$(this).find("Mtime").text()+']</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffT").text()+'</span> >>> �������֡�'+$(this).find("MtotolT").text()+'������н�ʣ�'+(($(this).find("MsalaryT").text()==''||$(this).find("MsalaryT").text()==0)?'��':$(this).find("MsalaryT").text())+'</li>';
						htmlinterviewlist+='<li style="color:#999;">�������'+($(this).find("MevalT").text()==''?'��':$.base64({data:$(this).find("MevalT").text(),type:1}))+($(this).find("McommT").text()==''?'':'��'+$.base64({data:$(this).find("McommT").text(),type:1})+'��')+'</li>';
						htmlinterviewlist+='<li><span style="font-weight:bold;">'+$(this).find("MstaffR").text()+'</span> >>> ��ҵ���֡�'+$(this).find("MtotolR").text()+'������н�ʣ�'+(($(this).find("MsalaryR").text()==''||$(this).find("MsalaryR").text()==0)?'��':$(this).find("MsalaryR").text())+'</li>';
						htmlinterviewlist+='<li style="color:#999;">��ҵ���'+($(this).find("MevalR").text()==''?'��':$.base64({data:$(this).find("MevalR").text(),type:1}))+($(this).find("McommR").text()==''?'':'��'+$.base64({data:$(this).find("McommR").text(),type:1})+'��')+'</li>';
					});htmldetails+=htmlinterviewlist;
					htmldetails+='<hr style="border:1px dashed #ccc;">';
				}
				htmldetails+='<input id="buttonshowdetail" type="button" value=" ��ʾȫ����ѯ��־ + " onclick="showCusTrace();" /> >>><ul id="custrace" style="display:none;">';
				$(ans).find("ctrace").each(function(){
					var ctracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+ctracecomment+'</li>';
				});htmldetails+='<hr style="border:1px dashed #ccc;"></ul>';
				$(ans).find("trace").each(function(){
					var tracecomment=$(this).find("comment").attr("value")==""?"":" >> <span style='color:#999;'>"+$(this).find("comment").attr("value")+"</span>";
					htmldetails+='<li>'+$(this).find("time").attr("value")+' '+$(this).find("tracename").attr("value").replace("%NAME%",'<span style="font-weight:bold;">'+$(this).find("name").attr("value")+'</span>')+'</span>'+tracecomment+'</li>';
				});
				htmldetails+='</ul><hr>';
				htmldetails+= '<br/><div><input name="cancel" onclick="CloseW(\'Details\');" type="button" value="�ر�" /></div>';
				$("#Details").html(htmldetails);
				JudgeWindowSizetoCss("#Details");
			}
		},
		complete:function(){
		}
	});
};

var gotoDirectoryPage=function(p){
	consultpage=p;
	GetDirectoryCondition();
};

var changeDirectoryPage=function(){
	gotoDirectoryPage($("#changeconsultpage").val());
};

var displayDirectoryOrder=function(){
	$("#imgtime").hide();
	$("#imgname").hide();
	$("#imgfee").hide();
	$("#imgjobarea").hide();
	$("#imgcompany").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var chkDirectoryDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getDirectoryData();
};

var changeDirectoryOrder=function(v){
	$("#imgtime").hide();
	$("#imgname").hide();
	$("#imgfee").hide();
	$("#imgjobarea").hide();
	$("#imgcompany").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetDirectoryCondition();
	$("#img"+v).show();
};

var DirectorySearcher=function(){
	Limitarea=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeDirectoryOrder(consultorderV);
};

var JudgeWindowSizetoCss=function(d){
	if($(d).offset().top+$(d).height() > $(window).height()-10){
		$(d).css({position:"absolute"});
		$(d).css({top: $(window).scrollTop()+10});
	}else $(d).css({position:"fixed"});
};

/**************************************************************/
var changeCollegeOrder=function(v){
	$("#imgtime").hide();
	consultpage=1;
	consultorderV=v;
	if(htmlimgAsc==$("#img"+v).attr("src")){
		consultorder=1;
		$("#img"+v).attr("src",htmlimgDesc);
	}else{
		consultorder=2;
		$("#img"+v).attr("src",htmlimgAsc);
	}
	GetCollegeCondition();
	$("#img"+v).show();
};

var displayCollegeOrder=function(){
	$("#imgtime").hide();
	$("#imgcollege").hide();
	$("#imgarea").hide();
	$("#imgchannel").hide();
	$("#imgldate").hide();
	$("#imgsdate").hide();
	if(1==consultorder)$("#img"+consultorderV).attr("src",htmlimgDesc);
	if(2==consultorder)$("#img"+consultorderV).attr("src",htmlimgAsc);
	$("#img"+consultorderV).show();
};

var changeCollegePage=function(){
	gotoCollegePage($("#changeconsultpage").val());
};

var gotoCollegePage=function(p){
	consultpage=p;
	GetCollegeCondition();
};

var getCollegeLocalstaff=function(){
	var requests={"question":"GetCollegeStaff","aid":Limitarea};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var isConsult=0;
				
				var htmlselConsult='<option value="0">ȫ��</option>';
				if(0<$(ans).find("staff").size()){
					$(ans).find("staff").each(function(){
						if(Limitconsult==$(this).attr("id")){
							isConsult=1;
							htmlselConsult+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
						}else{
							htmlselConsult+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						}
					});
				}else{
					htmlselConsult='<option value="0">��</option>';
				}
				if(0==isConsult){
					Limitconsult=0;
				}
				$("#consult").html(htmlselConsult);
			}
		},
		complete:function(){
			getCollegeData();
		}
	});
};

var setCollegeLimitArea=function(){
	Limitarea=$("#area").val();
	consultpage=1;
	getCollegeLocalstaff();
	$("#search").val("");
	consultkey="";
};

var setCollegeLimitConsult=function(){
	Limitconsult=$("#consult").val();
	consultpage=1;
	GetCollegeCondition();
	$("#search").val("");
	consultkey="";
};

var setCollegeLimitDate=function(c){
	consultpage=1;
	Limitdate=c;
	GetCollegeCondition();
	$("#search").val("");
	consultkey="";
};

var CollegeSearcher=function(){
	Limitarea=0;
	Limitconsult=0;
	Limitdate="all";
	consultorderV="time";
	consultorder=1;
	consultpage=1;
	consultkey=$("#search").val();
	$("#imgtime").attr("src",htmlimgAsc);
	changeCollegeOrder(consultorderV);
};

var GetCollegeCondition=function(){
	var requests={"question":"GetCollegeConditions"};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var html="";
				htmlhr='<hr style="border:1px dashed #eee;">';
				html+=htmlhr;
				if(0<$(ans).find("area").size()){
					html+='<span style="font-weight:bold;">����������</span><select id="area" onchange=setCollegeLimitArea();>';
					if(0==Limitarea){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("area").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("area").each(function(){
							if($(this).attr("id")==Limitarea){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("consult").size()){
					html+='<label id="selconsult"><span style="font-weight:bold;">ԺУ��չ��</span><select id="consult" onchange=setCollegeLimitConsult();>';
					if(0==Limitconsult){
						html+='<option value="0" selected="selected">ȫ��</option>';
						$(ans).find("consult").each(function(){
							html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
						});
					}else{
						html+='<option value="0" >ȫ��</option>';
						$(ans).find("consult").each(function(){
							if($(this).attr("id")==Limitconsult){
								html+='<option value="'+$(this).attr("id")+'" selected="selected">'+$(this).attr("name")+'</option>';
							}else{
								html+='<option value="'+$(this).attr("id")+'">'+$(this).attr("name")+'</option>';
							}
						});
					}
					html+="</select></label>&nbsp;&nbsp;&nbsp;&nbsp;";
				}
				if(0<$(ans).find("area").size()||0<$(ans).find("consult").size()){
					html+=htmlhr;
				}
				$("#selects").html(html);
				html="";
				if(0<$(ans).find("date").size()){
					$("#dpicker").hide();
					html+='<span style="font-weight:bold;">¼�����ڣ�</span>';
					$(ans).find("date").each(function(){
						if($(this).attr("id")==Limitdate){
							html+='<a class="active" id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setCollegeLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
							if("optional"==$(this).attr("id")){
								$("#dpicker").show();
							}
						}else{
							html+='<a id="'+$(this).attr("id")+'" href="javascript:void(0);" onclick="setCollegeLimitDate(\''+$(this).attr("id")+'\');">'+$(this).attr("name")+'</a>';
						}
					});
				}
				$("#datestr").html(html);
			}
		},
		complete:function(){
			getCollegeLocalstaff();
		}
	});
};

var chkCollegeDate=function(i){
	if(0==i){
		$("#date1").datepicker('option', 'minDate', $("#date0").datepicker( 'getDate' ));
	}
	if(1==i){
		$("#date0").datepicker('option', 'maxDate', $("#date1").datepicker( 'getDate' ));
	}
	getCollegeData();
};

var getCollegeData=function(){
	var requests={"question":"GetCollegeData","key":consultkey,"page":consultpage,'orderV':consultorderV,'order':consultorder,'area':Limitarea,"consult":Limitconsult,"date":Limitdate,"d0":$("#date0").val(),"d1":$("#date1").val()};
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
			loadings("s");
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			var htmlthead='';
			var htmltbody='';
			var htmltfooter="";
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2000==err){
				loadings("h");
			}
			if(1==err){
				var consulttotal=$(ans).find("answer").attr("all");
				var consulttotalpages=$(ans).find("answer").attr("pages");
				var consultcols=$(ans).find("answer").attr("cols");
				loadings("h");
				if(0==consulttotal){
					htmlthead+='<tr>';
					htmlthead+='<th width="100%" style="border-radius:10px 0 0 0;"><span style="color:#FF0000">'+consultcols+'</span></th>';
					htmlthead+='</tr>';
				}else{
					htmlthead+='<tr>';
					htmlthead+='<th width="15%" style="border-radius:10px 0 0 0;"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'time\');" class="tooltip" title="��¼��ʱ������" >¼��ʱ��<img id="imgtime" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��¼��ʱ������" /></a> </th>';
					htmlthead+='<th width="13%"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'college\');" class="tooltip" title="��ԺУ������" >ԺУ<img id="imgcollege" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ԺУ������" /></a> </th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'area\');" class="tooltip" title="��������������" >��������<img id="imgarea" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��������������" /></a> </th>';
					htmlthead+='<th width="7%"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'channel\');" class="tooltip" title="��ԺУ��չ������" >ԺУ��չ<img id="imgchannel" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ԺУ��չ������" /></a> </th>';
					htmlthead+='<th width="8%">��ѯ����</th>';
					htmlthead+='<th width="8%">��ϵ��</th>';
					htmlthead+='<th width="12%">��ϵ��ʽ</th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'ldate\');" class="tooltip" title="��������������" >��������<img id="imgldate" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="���༶����" /></a> </th>';
					htmlthead+='<th width="10%"><a href="javascript:void(0);" onclick="changeCollegeOrder(\'sdate\');" class="tooltip" title="��ԺУ����������" >������Ч��<img id="imgsdate" src="img/s_desc.gif" border="0" width="8px" height="6px" class="tooltip" title="��ԺУ����������" /></a> </th>';
					htmlthead+='<th width="7%">����</th>';
					htmlthead+='</tr>';
					$(ans).find("data").each(function(){
						htmltbody+="<tr>";
						htmltbody+="<td>"+$(this).find("time").text()+"</td>";
						htmltbody+='<td><span style="font-weight:bold;">'+$(this).find("college").text()+"</span></td>";
						htmltbody+='<td>'+$(this).find("area").text()+"</td>";
						htmltbody+='<td>'+$(this).find("channel").text()+"</td>";
						htmltbody+='<td>'+$(this).find("consult").text()+"</td>";
						htmltbody+='<td>'+($(this).find("header").text()==""?"-":$(this).find("header").text())+"</td>";
						htmltbody+='<td>'+($(this).find("contact").text()==""?"-":$(this).find("contact").text())+"</td>";
						htmltbody+='<td>'+$(this).find("ldate").text()+"</td>";
						htmltbody+='<td>'+$(this).find("sdate").text()+"</td>";
						htmltbody+='<td>'+(0<$(this).find("elimit").text()?'<input type="button" onclick="AddCollege('+$(this).attr("id")+');" value=" �� �� " />':"-")+'</td>';
						htmltbody+="</tr>";
					});
				}
				var htmlstatics="";
				htmlstatics += '<hr>';
				var p=1;
				if(1< Number(consultpage)){
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCollegePage('1');>��ҳ</a>��";
					p=Number(consultpage)-1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCollegePage('"+p+"');>��һҳ</a>��";
				}
				
				if(1<Number(consultpage) && Number(consulttotalpages)>Number(consultpage)){
					htmltfooter+="|��";
				}
				
				if(Number(consulttotalpages)>Number(consultpage)){
					p=Number(consultpage)+1;
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCollegePage('"+p+"');>��һҳ</a>��";
					htmltfooter+="<a href='javascript:void(0);' onclick=gotoCollegePage('"+consulttotalpages+"');>ĩҳ</a>��";
				}

				if(1<Number(consulttotalpages)){
					htmltfooter+="���ڡ�<label><select id='changeconsultpage' onchange='changeCollegePage();'>";
					for(var i=1;i<=Number(consulttotalpages);i++){
						if(i==consultpage){
							htmltfooter+="<option value='"+i+"' selected='selected'>"+i+"/"+consulttotalpages+"</option>";
						}else{
							htmltfooter+="<option value='"+i+"'>"+i+"/"+consulttotalpages+"</option>";
						}
					}
					htmltfooter+="</select></label>��ҳ��";
				}
				htmltfooter+="�� "+consulttotal+" ����¼";
			}
			if(0<$(ans).find("answer").attr("input"))$('#task2').html('<hr style="border:1px dashed #ccc;width:90%;"><input id="newcollege" type="button" value="������ԺУ" onclick="AddCollege();" />');
			$("#consultthead").html(htmlthead);
			$("#consulttbody").html(htmltbody);
			$("#consultfpage").html(htmltfooter);
			$("#statics").html(htmlstatics);
			if(""!=htmltbody){
				senfe("consulttbody","#FFF","#eee","#ddd","#F5D0A9");
			}
		},
		complete:function(){
			displayCollegeOrder();
			$('.tooltip').toolTip();
		}
	});
};

var AddCollege=function(i){
	$("#Operateloading").html("");
	showForm("#tabcollege","#fade");
	$("#colname").attr("value","");
	$("#colconsult").attr("value","");
	$("#coldepart").attr("value","");
	$("#colprof").attr("value","");
	$("#colhead").attr("value","");
	$("#colcontact").attr("value","");
	$("#colbate").attr("value","");
	$("#colrecv").attr("value","");
	$("#collecture").attr("value","");
	$("#collectnum").attr("value","");
	$("#collectres").attr("value","");
	$("#colcomment").attr("value","");
	$("#subcoledit").attr("value"," �� �� ");
	colid=0;
	if(0<i){
		$("#subcoledit").attr("value"," �� �� ");
		colid=i;
	}else $("#collecture").attr("disabled",false);
	GetColInputSels(colid);
};

var GetColInputSels=function(i){
	var requests={"question":"GetColInputSels","colid":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#Operateloading").html("");
			}
			if(1==err){
				colid=i;
				$("#Operateloading").html("");
				if(0==$(ans).find("answer").attr("do")){
					$("#subcoledit").hide();
					$("#collegetips").hide();
				}
				$(ans).find("answer").children().each(function(idx0,ele0){
					$("#"+$(ele0)[0].tagName).attr("value",$(this).attr("val"));
				});
				if(0<i)$("#collecture").attr("disabled","disabled");
			}
		},
		complete:function(){
		}
	});
};

var submitCollege=function(){
	var subcolname=$("#colname").attr("value");
	var subcolconsult=$("#colconsult").attr("value");
	var subcoldepart=$("#coldepart").attr("value");
	var subcolprof=$("#colprof").attr("value");
	var subcolhead=$("#colhead").attr("value");
	var subcolcontact=$("#colcontact").attr("value");
	var subcolbate=$("#colbate").attr("value");
	var subcolrecv=$("#colrecv").attr("value");
	var subcollecture=$("#collecture").attr("value");
	var subcollectnum=$("#collectnum").attr("value");
	var subcollectres=$("#collectres").attr("value");
	var subcolcomment=$("#colcomment").attr("value");
	var requests={"question":"UpdateCollegeDatas","id":colid,"colname":subcolname,"colconsult":subcolconsult,"coldepart":subcoldepart,"colprof":subcolprof,"colhead":subcolhead,"colcontact":subcolcontact,"colbate":subcolbate,"colrecv":subcolrecv,"collecture":subcollecture,"collectnum":subcollectnum,"collectres":subcollectres,"colcomment":subcolcomment};
	$.ajax({
		type:'POST',
		url:doUrl,
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
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(2001==err){
				$("#Operateloading").html($(ans).find("answer").attr("note"));
			}
			if(1010==err){
				hideForm("#tabcollege","#fade");
				GetCollegeCondition();
			}
		},
		complete:function(){
		}
	});
};

/****************************************************************/

var GetMarketRanking=function(m){
	var RankingHtml='';
	var requests={"question":"GetMarketRanking","m":m};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var numStaff;
				var RankingHtml_Consult='<h2>'+(m>0?"":"����")+'��ѯ��������</h2><table><tr class="yellow biaoti"><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th></tr>'
				$(ans).find("RankConsult").each(function(){
    			numStaff=$(this).find("staff").size();
    			var i=1;
    			$(this).find("staff").each(function(){
    				var c1='yellow';
    				var c2='qk';
    				var c3='ybg';
    				var c4='<img src="./images/ranking/last.png" />';
    				if(3>=$(this).parent().attr("id")){
    					c1='blue';c3='lbg';
    					if(1==$(this).parent().attr("id"))c2='jin';
    					if(2==$(this).parent().attr("id"))c2='yin';
    					if(3==$(this).parent().attr("id"))c2='tong';
    				}
						RankingHtml_Consult+='<tr class="'+c1+'">';
    				RankingHtml_Consult+=i==1 ? '<td rowspan="'+numStaff+'" class="'+c2+'">'+(3>=$(this).parent().attr("id")?"":$(this).parent().attr("id"))+'</td>':'';
    				RankingHtml_Consult+='<td class="'+c3+'">'+$(this).find("name").text()+'</td><td class="'+c3+'">'+$(this).find("area").text()+'</td><td class="'+c3+'">'+$(this).find("count").text()+'</td>';
    				RankingHtml_Consult+='</tr>';
    				i++;
    			});
    		});RankingHtml_Consult+='</table>';
    		var RankingHtml_Channel='<h2>'+(m>0?"":"����")+'ԺУ��չ����</h2><table><tr class="yellow biaoti"><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th><th class="jiabg" style=" width:25%;">����</th></tr>'
				$(ans).find("RankChannel").each(function(){
    			numStaff=$(this).find("staff").size();
    			var i=1;
    			$(this).find("staff").each(function(){
						var c1='yellow';
    				var c2='qk';
    				var c3='ybg';
    				var c4='<img src="./images/ranking/last.png" />';
    				if(3>=$(this).parent().attr("id")){
    					c1='blue';c3='lbg';
    					if(1==$(this).parent().attr("id"))c2='jin';
    					if(2==$(this).parent().attr("id"))c2='yin';
    					if(3==$(this).parent().attr("id"))c2='tong';
    				}
						RankingHtml_Channel+='<tr class="'+c1+'">';
    				RankingHtml_Channel+=i==1 ? '<td rowspan="'+numStaff+'" class="'+c2+'">'+(3>=$(this).parent().attr("id")?"":$(this).parent().attr("id"))+'</td>':'';
    				RankingHtml_Channel+='<td class="'+c3+'">'+$(this).find("name").text()+'</td><td class="'+c3+'">'+$(this).find("area").text()+'</td><td class="'+c3+'">'+$(this).find("count").text()+'</td>';
    				RankingHtml_Channel+='</tr>';
    				i++;
    				
    			});
    		});RankingHtml_Channel+='</table>';
    		$(".zixun").html(RankingHtml_Consult);
    		$(".qudao").html(RankingHtml_Channel);
			}
		},
		complete:function(){
		}
	});
};

var RankingTimer=function(){
	var requests={"question":"GetRankingThismonthSec"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				var intS=$(ans).find("answer").attr("note");
				window.setInterval(function(){
				  var day=0,hour=0,minute=0,second=0;//ʱ��Ĭ��ֵ       
				  if(intS > 0){
				  	day = Math.floor(intS / (60 * 60 * 24));
				  	hour = Math.floor(intS / (60 * 60)) - (day * 24);
				  	minute = Math.floor(intS / 60) - (day * 24 * 60) - (hour * 60);
				   	second = Math.floor(intS) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				  }
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					$('#day_show').html(day+"��");
					$('#hour_show').html('<s id="h"></s>'+hour+'ʱ');
					$('#minute_show').html('<s></s>'+minute+'��');
					$('#second_show').html('<s></s>'+second+'��');
					intS--;
				}, 1000);
			}
		},
		complete:function(){
		}
	});
};

/****************************************************************/
function senfei(o,a,b,c,d,e,f,g,h,j,k,l,m){
 var t=document.getElementById(o).getElementsByTagName("tr");
 for(var i=0;i<t.length;i++){
  if(t[i].className=='flag'){
 		t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?e:f;
  	t[i].onclick=function(){
	   if(this.x!="1"){
	    this.x="1";
	    this.style.backgroundColor=h;
	   }else{
	    this.x="0";
	    this.style.backgroundColor=(this.sectionRowIndex%2==0)?e:f;
	   }
	  }
	  t[i].onmouseover=function(){
	   if(this.x!="1")this.style.backgroundColor=g;
	  }
	  t[i].onmouseout=function(){
	   if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?e:f;
	  }
  }
  else if(t[i].className=='flagt'){
  	t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?j:k;
  	t[i].onclick=function(){
	   if(this.x!="1"){
	    this.x="1";
	    this.style.backgroundColor=m;
	   }else{
	    this.x="0";
	    this.style.backgroundColor=(this.sectionRowIndex%2==0)?j:k;
	   }
	  }
	  t[i].onmouseover=function(){
	   if(this.x!="1")this.style.backgroundColor=l;
	  }
	  t[i].onmouseout=function(){
	   if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?j:k;
	  }
  }else{
  	t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b;
	  t[i].onclick=function(){
	   if(this.x!="1"){
	    this.x="1";
	    this.style.backgroundColor=d;
	   }else{
	    this.x="0";
	    this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
	   }
	  }
	  t[i].onmouseover=function(){
	   if(this.x!="1")this.style.backgroundColor=c;
	  }
	  t[i].onmouseout=function(){
	   if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
	  }
	}
 }
};

function senfe(o,a,b,c,d){
 var t=document.getElementById(o).getElementsByTagName("tr");
 for(var i=0;i<t.length;i++){
  t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b;
  t[i].onclick=function(){
   if(this.x!="1"){
    this.x="1";
    this.style.backgroundColor=d;
   }else{
    this.x="0";
    this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
   }
  }
  t[i].onmouseover=function(){
   if(this.x!="1")this.style.backgroundColor=c;
  }
  t[i].onmouseout=function(){
   if(this.x!="1")this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
  }
 }
};

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { /* name and value given, set cookie */
		options = options || {};
		if (value === null) {
			value = '';
      options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
			date = new Date();
			date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { /* only name given, get cookie */
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				/* Does this cookie string begin with the name we want? */
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

(function($){
	$.fn.toolTip = function(options) {
		var defaults = {
		  background: '#666',
			color: '#fff',
			opacity: '0.7',
			radius: '10px 10px 10px 0'
		},
		options = $.extend(defaults, options);
		return this.each(function() {
			var elem = $(this);
			var title = elem.attr('title');
			if(title != '') {
				var tooltip = $('<div id="tooltip" />');
				elem.attr('title','');
				elem.hover(function(e) {
					tooltip.hide().appendTo('body')
					.html(title)
					.hide()
					.css({
						'background-color' : options.background,
						'color' : options.color,
						'opacity' : options.opacity,
						'border-radius' : options.radius
					 })
					.fadeIn(100);
				},
				function() {
					tooltip.remove(); //remove the tooltip
				}),
				elem.click(function(e) {
					tooltip.remove();
				});
			}
			elem.mousemove(function(e) {
				tooltip.css({
					top: e.pageY - 40,
					left: e.pageX - 10
				});
			});
		});
	}
})(jQuery);

;(function($) {
	$.extend({
		blinkTitle : {
			show : function() {
				var title0="��Ÿ�Ƽ� �� Lanou3G.Com";
				var step=0, _title = title0;
				var timer = setInterval(function() {
					document.title=title0;
					step++;
					if (step==3) {step=1};
					if (step==1) {document.title='����������������'+_title};
					if (step==2) {document.title='�����д���������'+_title};
				}, 500);
				
				return [timer, _title];
			},
			clear : function(timerArr) {
				if(timerArr) {
					clearInterval(timerArr[0]);	
					document.title = timerArr[1];
				};
			}
		}
	});
})(jQuery);

var sblink =function($) {
	var timerArr = $.blinkTitle.show();
	setTimeout(function() {
		$.blinkTitle.clear(timerArr);
	}, 10000);
};

var changeColor=function(){ 
	var color="red|#2E2EFE"; 
	color=color.split("|"); 
	document.getElementById("colorfont").style.color=color[parseInt(Math.random() * color.length)]; 
};

var BookSelect=function(oThis,tabletelID,Num){
	for(i=0;i<Num;i++){  
		document.getElementById('tabletel' + i).style.display = 'none'; 
		$('#td'+i).removeClass('active');
	} 
	document.getElementById(tabletelID).style.display = '';
	$('#'+oThis.id).addClass('active');
};

var BookSelectMenuList=function(){
	var requests={"question":"GetAddressBooksRes"};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1==err){
				var htmlbooktitle=htmlbookres='';
				var bli=rli=0;
				var adlocate=$(ans).find("answer").attr("locate");
				$(ans).find("locate").each(function(){
					htmlbooktitle+='<a href="javascript:void(0);" id="td'+bli+'" onclick="BookSelect( this,\'tabletel'+bli+'\','+$(ans).find("answer").attr("num")+')" style="width:12%">'+$(this).attr("val")+'</a>';
					bli++;
				});
				$(".xiaoqu").html(htmlbooktitle);
				$(ans).find("list").each(function(){
					htmlbookres+='<div id="tabletel'+rli+'" class="table-tel" style="display: none;">';
					htmlbookres+='<table class="guding">';
				  htmlbookres+='<caption><b>'+$(this).attr("addr")+' '+$(this).attr("bookscomm")+'</b></caption>';
					htmlbookres+='<tr class="biaoti">';
					htmlbookres+='<th style="width:15%">����</th>';
					htmlbookres+='<th style="width:10%">����</th>';
					htmlbookres+='<th style="width:15%">ְλ</th>';
					htmlbookres+='<th style="width:15%">�绰</th>';
					htmlbookres+='<th style="width:20%">����</th>';
					htmlbookres+='<th style="width:10%">�칫����</th>';
					htmlbookres+='<th style="width:15%">�칫����</th>';
					htmlbookres+='</tr>';
					htmlbookres+='</table>';
					var vli=1;
					$(this).find("res").each(function(){
						var department=$(this).attr("duty");
						htmlbookres+='<table class="tableTel">';
						htmlbookres+='<tbody>';
    				htmlbookres+='<tr class="department" id="department'+vli+'1'+rli+'" onclick="showhideBookmenu('+vli+'1'+rli+');">';
    				htmlbookres+='<td colspan="8">'+department+'</td>'; 		
    				htmlbookres+='</tr>';
    				$(this).find("staff").each(function(){
    					htmlbookres+='<tr>';
    					htmlbookres+='<td style="width:15%">'+department+'</td>';
			    		htmlbookres+='<td style="width:10%;font-weight:bold;">'+$(this).attr("stuff")+'</td>';
							htmlbookres+='<td style="width:15%">'+$(this).attr("job")+'</td>';
			    		htmlbookres+='<td style="width:15%"><label id="stuff_duty0'+$(this).attr("id")+'" onclick="tofetchMdn('+$(this).attr("id")+',0);">***********</label></td>';
			    		htmlbookres+='<td style="width:20%"><a href="mailto://'+$(this).attr("email")+'">'+$(this).attr("email")+'</a></td>';
							htmlbookres+='<td style="width:10%">'+$(this).attr("telin")+'</td>';		
							htmlbookres+='<td style="width:15%">'+$(this).attr("telout")+'</td>';
							htmlbookres+='</tr>';
    				});
						htmlbookres+='</tbody>';
						htmlbookres+='</table>';
						vli++;
					});
					rli++;
					htmlbookres+='</div>';
				});
				$("#listres").html(htmlbookres);
				BookSelect(document.getElementById('td'+adlocate+''),'tabletel'+adlocate+'',bli);
			}
		},
		complete:function(){
		}
	});  
};

var tofetchMdn=function(i,t){
	var requests={"question":"tofetchMdn","did":i};
	var htmlmsg="";
		$.ajax({
		type:'POST',
		url:doUrl,
		data:requests,
		dateType:'xml',
		beforeSend:function(){
		},
		error:function(e){
		},
		success:function(ans){
			var err=$(ans).find("answer").attr("err");
			if(4000==err){
				gopage=$(ans).find("answer").attr("gopage");
				gotoWhere(gopage,1);
			}
			if(1010==err){
				$("#stuff_duty"+t+i).html($(ans).find("answer").attr("note"));
			}
		},
		complete:function(){
		}
	});
};

var showhideBookmenu=function(i){
	var sib = $("#department"+i).siblings();
	if(sib.is(':visible')){
		sib.hide();
	}else{
		sib.show();
	}
};

var BookSearcher=function(){
	var bookkeys=$("#searchKey").val();
	var searcherRes="";
	if(""!=bookkeys){
		var requests={"question":"GetBookSearcher","keys":bookkeys};
			$.ajax({
			type:'POST',
			url:doUrl,
			data:requests,
			dateType:'xml',
			beforeSend:function(){
			},
			error:function(e){
			},
			success:function(ans){
				var err=$(ans).find("answer").attr("err");
				if(4000==err){
					gopage=$(ans).find("answer").attr("gopage");
					gotoWhere(gopage,1);
				}
				if(2000==err){
					alert("���޼�¼��");
				}
				if(1==err){
					searcherRes+='<table class="guding">';
	    		searcherRes+='<img id="close1" src="img/dialog_close.png" onclick="BookClose();"/>';
					searcherRes+='<tr class="biaoti">';
					searcherRes+='<th style="width:10%">����</th>';
					searcherRes+='<th style="width:15%">����</th>';
					searcherRes+='<th style="width:10%">����</th>';
					searcherRes+='<th style="width:15%">ְλ</th>';
					searcherRes+='<th style="width:10%">�绰</th>';
					searcherRes+='<th style="width:20%">����</th>';
					searcherRes+='<th style="width:10%">�ֻ�</th>';
					searcherRes+='<th style="width:10%">����</th>';
					searcherRes+='</tr>';
	    		$(ans).find("staff").each(function(){
						searcherRes+='<tr style="background-color:#eee;height:25px;">';
						searcherRes+='<td>'+$(this).attr("locate")+'</td>';
						searcherRes+='<td>'+$(this).attr("department")+'</td>';
						searcherRes+='<td>'+$(this).attr("name")+'</td>';
						searcherRes+='<td>'+$(this).attr("duty")+'</td>';
						searcherRes+='<td><label id="stuff_duty1'+$(this).attr("id")+'" onclick="tofetchMdn('+$(this).attr("id")+',1);">***********</label></td>';
						searcherRes+='<td>'+$(this).attr("email")+'</td>';
						searcherRes+='<td>'+$(this).attr("telin")+'</td>';
						searcherRes+='<td>'+$(this).attr("telout")+'</td>';
						searcherRes+='</tr>';
					});
					searcherRes+='</table>';
					$("#Tel-biaoti").html(searcherRes);
					$("#Tel-biaoti").show();
				}
			},
			complete:function(){
			}
		});
	}
};

var BookClose=function(){
	$("#Tel-biaoti").css("display","none");
};

$(function(){
  $("#s1 option:first,#s2 option:first").attr("selected",true);
  $("#s1").dblclick(function(){
    var alloptions = $("#s1 option");
    var so = $("#s1 option:selected");
 if(so === null || so == "undefined"){
  return;
 }
 try{
     var a = (so.get(so.length-1).index == alloptions.length-1)? so.prev().attr("selected",true):so.next().attr("selected",true);
    }catch(e){
     return;
    }
    $("#s2").append(so);
  });
  $("#s2").dblclick(function(){
    var alloptions = $("#s2 option");
    var so = $("#s2 option:selected");
 if(so === null || so == "undefined"){
  return;
 }
 try{
     var a = (so.get(so.length-1).index == alloptions.length-1)? so.prev().attr("selected",true):so.next().attr("selected",true);
    }catch(e){
     return;
    }
    $("#s1").append(so);
  });
  $("#add").click(function(){
    var alloptions = $("#s1 option");
    var so = $("#s1 option:selected");
		if(typeof(so.attr("value")) != "undefined"){
	    var a = (so.get(so.length-1).index == alloptions.length-1)? so.prev().attr("selected",true):so.next().attr("selected",true);
	    $("#s2").append(so);
	  }
  });
  $("#remove").click(function(){
    var alloptions = $("#s2 option");
    var so = $("#s2 option:selected");
    if(typeof(so.attr("value")) != "undefined"){
	    var a = (so.get(so.length-1).index == alloptions.length-1)? so.prev().attr("selected",true):so.next().attr("selected",true);
	    $("#s1").append(so);
	  }
  });
  $("#addall").click(function(){
    $("#s2").append($("#s1 option").attr("selected",true));
  });
 
  $("#removeall").click(function(){
    $("#s1").append($("#s2 option").attr("selected",true));
  });
  $("#s1up").click(function(){
    var so = $("#s1 option:selected");
    if(so.get(0).index!==0){
      so.each(function(){
          $(this).prev().before($(this));
      });
    }
  });
  $("#s1down").click(function(){
    var alloptions = $("#s1 option");
    var so = $("#s1 option:selected");
    if(so.get(so.length-1).index!=alloptions.length-1){
      for(i=so.length-1;i>=0;i=1-1)
      {
        var item = $(so.get(i));
        item.insertAfter(item.next());
      }
    }
  });
  $("#s2up").click(function(){
    var so = $("#s2 option:selected");
    if(typeof(so.attr("value")) != "undefined"){
	    if(so.get(0).index!==0){
	      so.each(function(){
	          $(this).prev().before($(this));
	      });
	    }
	  }
  });
  $("#s2down").click(function(){
    var alloptions = $("#s2 option");
    var so = $("#s2 option:selected");
    if(typeof(so.attr("value")) != "undefined"){
	    if(so.get(so.length-1).index!=alloptions.length-1){
	      for(i=so.length-1;i>=0;i--)
	      {
	        var item = $(so.get(i));
	        item.insertAfter(item.next());
	      }
	    }
	  }
  });
});

(function($) {
    $.base64 = function(options) {
        var defaults = {
            data:"",
            type:0,
            unicode:true
        };
        var opts = $.extend(defaults,options);
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
        
        UnicodeChr = function(){  
            return '00A4,00A7,00A8,00B0,00B1,00B7,00D7,00E0,00E1,00E8,00E9,00EA,00EC,00ED,00F2,00F3,00F7,00F9,00FA,00FC,0101,0113,011B,012B,014D,016B,01CE,01D0,01D2,01D4,01D6,01D8,01DA,01DC,02C7,02C9,0391,0392,0393,0394,0395,0396,0397,0398,0399,039A,039B,039C,039D,039E,039F,03A0,03A1,03A3,03A4,03A5,03A6,03A7,03A8,03A9,03B1,03B2,03B3,03B4,03B5,03B6,03B7,03B8,03B9,03BA,03BB,03BC,03BD,03BE,03BF,03C0,03C1,03C3,03C4,03C5,03C6,03C7,03C8,03C9,0401,0410,0411,0412,0413,0414,0415,0416,0417,0418,0419,041A,041B,041C,041D,041E,041F,0420,0421,0422,0423,0424,0425,0426,0427,0428,0429,042A,042B,042C,042D,042E,042F,0430,0431,0432,0433,0434,0435,0436,0437,0438,0439,043A,043B,043C,043D,043E,043F,0440,0441,0442,0443,0444,0445,0446,0447,0448,0449,044A,044B,044C,044D,044E,044F,0451,2014,2016,2018,2019,201C,201D,2026,2030,2032,2033,203B,2103,2116,2160,2161,2162,2163,2164,2165,2166,2167,2168,2169,216A,216B,2190,2191,2192,2193,2208,220F,2211,221A,221D,221E,2220,2225,2227,2228,2229,222A,222B,222E,2234,2235,2236,2237,223D,2248,224C,2260,2261,2264,2265,226E,226F,2299,22A5,2312,2460,2461,2462,2463,2464,2465,2466,2467,2468,2469,2474,2475,2476,2477,2478,2479,247A,247B,247C,247D,247E,247F,2480,2481,2482,2483,2484,2485,2486,2487,2488,2489,248A,248B,248C,248D,248E,248F,2490,2491,2492,2493,2494,2495,2496,2497,2498,2499,249A,249B,2500,2501,2502,2503,2504,2505,2506,2507,2508,2509,250A,250B,250C,250D,250E,250F,2510,2511,2512,2513,2514,2515,2516,2517,2518,2519,251A,251B,251C,251D,251E,251F,2520,2521,2522,2523,2524,2525,2526,2527,2528,2529,252A,252B,252C,252D,252E,252F,2530,2531,2532,2533,2534,2535,2536,2537,2538,2539,253A,253B,253C,253D,253E,253F,2540,2541,2542,2543,2544,2545,2546,2547,2548,2549,254A,254B,25A0,25A1,25B2,25B3,25C6,25C7,25CB,25CE,25CF,2605,2606,2640,2642,3000,3001,3002,3003,3005,3008,3009,300A,300B,300C,300D,300E,300F,3010,3011,3013,3014,3015,3016,3017,3041,3042,3043,3044,3045,3046,3047,3048,3049,304A,304B,304C,304D,304E,304F,3050,3051,3052,3053,3054,3055,3056,3057,3058,3059,305A,305B,305C,305D,305E,305F,3060,3061,3062,3063,3064,3065,3066,3067,3068,3069,306A,306B,306C,306D,306E,306F,3070,3071,3072,3073,3074,3075,3076,3077,3078,3079,307A,307B,307C,307D,307E,307F,3080,3081,3082,3083,3084,3085,3086,3087,3088,3089,308A,308B,308C,308D,308E,308F,3090,3091,3092,3093,30A1,30A2,30A3,30A4,30A5,30A6,30A7,30A8,30A9,30AA,30AB,30AC,30AD,30AE,30AF,30B0,30B1,30B2,30B3,30B4,30B5,30B6,30B7,30B8,30B9,30BA,30BB,30BC,30BD,30BE,30BF,30C0,30C1,30C2,30C3,30C4,30C5,30C6,30C7,30C8,30C9,30CA,30CB,30CC,30CD,30CE,30CF,30D0,30D1,30D2,30D3,30D4,30D5,30D6,30D7,30D8,30D9,30DA,30DB,30DC,30DD,30DE,30DF,30E0,30E1,30E2,30E3,30E4,30E5,30E6,30E7,30E8,30E9,30EA,30EB,30EC,30ED,30EE,30EF,30F0,30F1,30F2,30F3,30F4,30F5,30F6,3105,3106,3107,3108,3109,310A,310B,310C,310D,310E,310F,3110,3111,3112,3113,3114,3115,3116,3117,3118,3119,311A,311B,311C,311D,311E,311F,3120,3121,3122,3123,3124,3125,3126,3127,3128,3129,3220,3221,3222,3223,3224,3225,3226,3227,3228,3229,4E00,4E01,4E03,4E07,4E08,4E09,4E0A,4E0B,4E0C,4E0D,4E0E,4E10,4E11,4E13,4E14,4E15,4E16,4E18,4E19,4E1A,4E1B,4E1C,4E1D,4E1E,4E22,4E24,4E25,4E27,4E28,4E2A,4E2B,4E2C,4E2D,4E30,4E32,4E34,4E36,4E38,4E39,4E3A,4E3B,4E3D,4E3E,4E3F,4E43,4E45,4E47,4E48,4E49,4E4B,4E4C,4E4D,4E4E,4E4F,4E50,4E52,4E53,4E54,4E56,4E58,4E59,4E5C,4E5D,4E5E,4E5F,4E60,4E61,4E66,4E69,4E70,4E71,4E73,4E7E,4E86,4E88,4E89,4E8B,4E8C,4E8D,4E8E,4E8F,4E91,4E92,4E93,4E94,4E95,4E98,4E9A,4E9B,4E9F,4EA0,4EA1,4EA2,4EA4,4EA5,4EA6,4EA7,4EA8,4EA9,4EAB,4EAC,4EAD,4EAE,4EB2,4EB3,4EB5,4EBA,4EBB,4EBF,4EC0,4EC1,4EC2,4EC3,4EC4,4EC5,4EC6,4EC7,4EC9,4ECA,4ECB,4ECD,4ECE,4ED1,4ED3,4ED4,4ED5,4ED6,4ED7,4ED8,4ED9,4EDD,4EDE,4EDF,4EE1,4EE3,4EE4,4EE5,4EE8,4EEA,4EEB,4EEC,4EF0,4EF2,4EF3,4EF5,4EF6,4EF7,4EFB,4EFD,4EFF,4F01,4F09,4F0A,4F0D,4F0E,4F0F,4F10,4F11,4F17,4F18,4F19,4F1A,4F1B,4F1E,4F1F,4F20,4F22,4F24,4F25,4F26,4F27,4F2A,4F2B,4F2F,4F30,4F32,4F34,4F36,4F38,4F3A,4F3C,4F3D,4F43,4F46,4F4D,4F4E,4F4F,4F50,4F51,4F53,4F55,4F57,4F58,4F59,4F5A,4F5B,4F5C,4F5D,4F5E,4F5F,4F60,4F63,4F64,4F65,4F67,4F69,4F6C,4F6F,4F70,4F73,4F74,4F76,4F7B,4F7C,4F7E,4F7F,4F83,4F84,4F88,4F89,4F8B,4F8D,4F8F,4F91,4F94,4F97,4F9B,4F9D,4FA0,4FA3,4FA5,4FA6,4FA7,4FA8,4FA9,4FAA,4FAC,4FAE,4FAF,4FB5,4FBF,4FC3,4FC4,4FC5,4FCA,4FCE,4FCF,4FD0,4FD1,4FD7,4FD8,4FDA,4FDC,4FDD,4FDE,4FDF,4FE1,4FE3,4FE6,4FE8,4FE9,4FEA,4FED,4FEE,4FEF,4FF1,4FF3,4FF8,4FFA,4FFE,500C,500D,500F,5012,5014,5018,5019,501A,501C,501F,5021,5025,5026,5028,5029,502A,502C,502D,502E,503A,503C,503E,5043,5047,5048,504C,504E,504F,5055,505A,505C,5065,506C,5076,5077,507B,507E,507F,5080,5085,5088,508D,50A3,50A5,50A7,50A8,50A9,50AC,50B2,50BA,50BB,50CF,50D6,50DA,50E6,50E7,50EC,50ED,50EE,50F3,50F5,50FB,5106,5107,510B,5112,5121,513F,5140,5141,5143,5144,5145,5146,5148,5149,514B,514D,5151,5154,5155,5156,515A,515C,5162,5165,5168,516B,516C,516D,516E,5170,5171,5173,5174,5175,5176,5177,5178,5179,517B,517C,517D,5180,5181,5182,5185,5188,5189,518C,518D,5192,5195,5196,5197,5199,519B,519C,51A0,51A2,51A4,51A5,51AB,51AC,51AF,51B0,51B1,51B2,51B3,51B5,51B6,51B7,51BB,51BC,51BD,51C0,51C4,51C6,51C7,51C9,51CB,51CC,51CF,51D1,51DB,51DD,51E0,51E1,51E4,51EB,51ED,51EF,51F0,51F3,51F5,51F6,51F8,51F9,51FA,51FB,51FC,51FD,51FF,5200,5201,5202,5203,5206,5207,5208,520A,520D,520E,5211,5212,5216,5217,5218,5219,521A,521B,521D,5220,5224,5228,5229,522B,522D,522E,5230,5233,5236,5237,5238,5239,523A,523B,523D,523F,5240,5241,5242,5243,524A,524C,524D,5250,5251,5254,5256,525C,525E,5261,5265,5267,5269,526A,526F,5272,527D,527F,5281,5282,5288,5290,5293,529B,529D,529E,529F,52A0,52A1,52A2,52A3,52A8,52A9,52AA,52AB,52AC,52AD,52B1,52B2,52B3,52BE,52BF,52C3,52C7,52C9,52CB,52D0,52D2,52D6,52D8,52DF,52E4,52F0,52F9,52FA,52FE,52FF,5300,5305,5306,5308,530D,530F,5310,5315,5316,5317,5319,531A,531D,5320,5321,5323,5326,532A,532E,5339,533A,533B,533E,533F,5341,5343,5345,5347,5348,5349,534A,534E,534F,5351,5352,5353,5355,5356,5357,535A,535C,535E,535F,5360,5361,5362,5363,5364,5366,5367,5369,536B,536E,536F,5370,5371,5373,5374,5375,5377,5378,537A,537F,5382,5384,5385,5386,5389,538B,538C,538D,5395,5398,539A,539D,539F,53A2,53A3,53A5,53A6,53A8,53A9,53AE,53B6,53BB,53BF,53C1,53C2,53C8,53C9,53CA,53CB,53CC,53CD,53D1,53D4,53D6,53D7,53D8,53D9,53DB,53DF,53E0,53E3,53E4,53E5,53E6,53E8,53E9,53EA,53EB,53EC,53ED,53EE,53EF,53F0,53F1,53F2,53F3,53F5,53F6,53F7,53F8,53F9,53FB,53FC,53FD,5401,5403,5404,5406,5408,5409,540A,540C,540D,540E,540F,5410,5411,5412,5413,5415,5416,5417,541B,541D,541E,541F,5420,5421,5423,5426,5427,5428,5429,542B,542C,542D,542E,542F,5431,5432,5434,5435,5438,5439,543B,543C,543E,5440,5443,5446,5448,544A,544B,5450,5452,5453,5454,5455,5456,5457,5458,5459,545B,545C,5462,5464,5466,5468,5471,5472,5473,5475,5476,5477,5478,547B,547C,547D,5480,5482,5484,5486,548B,548C,548E,548F,5490,5492,5494,5495,5496,5499,549A,549B,549D,54A3,54A4,54A6,54A7,54A8,54A9,54AA,54AB,54AC,54AD,54AF,54B1,54B3,54B4,54B8,54BB,54BD,54BF,54C0,54C1,54C2,54C4,54C6,54C7,54C8,54C9,54CC,54CD,54CE,54CF,54D0,54D1,54D2,54D3,54D4,54D5,54D7,54D9,54DA,54DC,54DD,54DE,54DF,54E5,54E6,54E7,54E8,54E9,54EA,54ED,54EE,54F2,54F3,54FA,54FC,54FD,54FF,5501,5506,5507,5509,550F,5510,5511,5514,551B,5520,5522,5523,5524,5527,552A,552C,552E,552F,5530,5531,5533,5537,553C,553E,553F,5541,5543,5544,5546,5549,554A,5550,5555,5556,555C,5561,5564,5565,5566,5567,556A,556C,556D,556E,5575,5576,5577,5578,557B,557C,557E,5580,5581,5582,5583,5584,5587,5588,5589,558A,558B,558F,5591,5594,5598,5599,559C,559D,559F,55A7,55B1,55B3,55B5,55B7,55B9,55BB,55BD,55BE,55C4,55C5,55C9,55CC,55CD,55D1,55D2,55D3,55D4,55D6,55DC,55DD,55DF,55E1,55E3,55E4,55E5,55E6,55E8,55EA,55EB,55EC,55EF,55F2,55F3,55F5,55F7,55FD,55FE,5600,5601,5608,5609,560C,560E,560F,5618,561B,561E,561F,5623,5624,5627,562C,562D,5631,5632,5634,5636,5639,563B,563F,564C,564D,564E,5654,5657,5658,5659,565C,5662,5664,5668,5669,566A,566B,566C,5671,5676,567B,567C,5685,5686,568E,568F,5693,56A3,56AF,56B7,56BC,56CA,56D4,56D7,56DA,56DB,56DD,56DE,56DF,56E0,56E1,56E2,56E4,56EB,56ED,56F0,56F1,56F4,56F5,56F9,56FA,56FD,56FE,56FF,5703,5704,5706,5708,5709,570A,571C,571F,5723,5728,5729,572A,572C,572D,572E,572F,5730,5733,5739,573A,573B,573E,5740,5742,5747,574A,574C,574D,574E,574F,5750,5751,5757,575A,575B,575C,575D,575E,575F,5760,5761,5764,5766,5768,5769,576A,576B,576D,576F,5773,5776,5777,577B,577C,5782,5783,5784,5785,5786,578B,578C,5792,5793,579B,57A0,57A1,57A2,57A3,57A4,57A6,57A7,57A9,57AB,57AD,57AE,57B2,57B4,57B8,57C2,57C3,57CB,57CE,57CF,57D2,57D4,57D5,57D8,57D9,57DA,57DD,57DF,57E0,57E4,57ED,57EF,57F4,57F8,57F9,57FA,57FD,5800,5802,5806,5807,580B,580D,5811,5815,5819,581E,5820,5821,5824,582A,5830,5835,5844,584C,584D,5851,5854,5858,585E,5865,586B,586C,587E,5880,5881,5883,5885,5889,5892,5893,5899,589A,589E,589F,58A8,58A9,58BC,58C1,58C5,58D1,58D5,58E4,58EB,58EC,58EE,58F0,58F3,58F6,58F9,5902,5904,5907,590D,590F,5914,5915,5916,5919,591A,591C,591F,5924,5925,5927,5929,592A,592B,592D,592E,592F,5931,5934,5937,5938,5939,593A,593C,5941,5942,5944,5947,5948,5949,594B,594E,594F,5951,5954,5955,5956,5957,5958,595A,5960,5962,5965,5973,5974,5976,5978,5979,597D,5981,5982,5983,5984,5986,5987,5988,598A,598D,5992,5993,5996,5997,5999,599E,59A3,59A4,59A5,59A8,59A9,59AA,59AB,59AE,59AF,59B2,59B9,59BB,59BE,59C6,59CA,59CB,59D0,59D1,59D2,59D3,59D4,59D7,59D8,59DA,59DC,59DD,59E3,59E5,59E8,59EC,59F9,59FB,59FF,5A01,5A03,5A04,5A05,5A06,5A07,5A08,5A09,5A0C,5A11,5A13,5A18,5A1C,5A1F,5A20,5A23,5A25,5A29,5A31,5A32,5A34,5A36,5A3C,5A40,5A46,5A49,5A4A,5A55,5A5A,5A62,5A67,5A6A,5A74,5A75,5A76,5A77,5A7A,5A7F,5A92,5A9A,5A9B,5AAA,5AB2,5AB3,5AB5,5AB8,5ABE,5AC1,5AC2,5AC9,5ACC,5AD2,5AD4,5AD6,5AD8,5ADC,5AE0,5AE1,5AE3,5AE6,5AE9,5AEB,5AF1,5B09,5B16,5B17,5B32,5B34,5B37,5B40,5B50,5B51,5B53,5B54,5B55,5B57,5B58,5B59,5B5A,5B5B,5B5C,5B5D,5B5F,5B62,5B63,5B64,5B65,5B66,5B69,5B6A,5B6C,5B70,5B71,5B73,5B75,5B7A,5B7D,5B80,5B81,5B83,5B84,5B85,5B87,5B88,5B89,5B8B,5B8C,5B8F,5B93,5B95,5B97,5B98,5B99,5B9A,5B9B,5B9C,5B9D,5B9E,5BA0,5BA1,5BA2,5BA3,5BA4,5BA5,5BA6,5BAA,5BAB,5BB0,5BB3,5BB4,5BB5,5BB6,5BB8,5BB9,5BBD,5BBE,5BBF,5BC2,5BC4,5BC5,5BC6,5BC7,5BCC,5BD0,5BD2,5BD3,5BDD,5BDE,5BDF,5BE1,5BE4,5BE5,5BE8,5BEE,5BF0,5BF8,5BF9,5BFA,5BFB,5BFC,5BFF,5C01,5C04,5C06,5C09,5C0A,5C0F,5C11,5C14,5C15,5C16,5C18,5C1A,5C1C,5C1D,5C22,5C24,5C25,5C27,5C2C,5C31,5C34,5C38,5C39,5C3A,5C3B,5C3C,5C3D,5C3E,5C3F,5C40,5C41,5C42,5C45,5C48,5C49,5C4A,5C4B,5C4E,5C4F,5C50,5C51,5C55,5C59,5C5E,5C60,5C61,5C63,5C65,5C66,5C6E,5C6F,5C71,5C79,5C7A,5C7F,5C81,5C82,5C88,5C8C,5C8D,5C90,5C91,5C94,5C96,5C97,5C98,5C99,5C9A,5C9B,5C9C,5CA2,5CA3,5CA9,5CAB,5CAC,5CAD,5CB1,5CB3,5CB5,5CB7,5CB8,5CBD,5CBF,5CC1,5CC4,5CCB,5CD2,5CD9,5CE1,5CE4,5CE5,5CE6,5CE8,5CEA,5CED,5CF0,5CFB,5D02,5D03,5D06,5D07,5D0E,5D14,5D16,5D1B,5D1E,5D24,5D26,5D27,5D29,5D2D,5D2E,5D34,5D3D,5D3E,5D47,5D4A,5D4B,5D4C,5D58,5D5B,5D5D,5D69,5D6B,5D6C,5D6F,5D74,5D82,5D99,5D9D,5DB7,5DC5,5DCD,5DDB,5DDD,5DDE,5DE1,5DE2,5DE5,5DE6,5DE7,5DE8,5DE9,5DEB,5DEE,5DEF,5DF1,5DF2,5DF3,5DF4,5DF7,5DFD,5DFE,5E01,5E02,5E03,5E05,5E06,5E08,5E0C,5E0F,5E10,5E11,5E14,5E15,5E16,5E18,5E19,5E1A,5E1B,5E1C,5E1D,5E26,5E27,5E2D,5E2E,5E31,5E37,5E38,5E3B,5E3C,5E3D,5E42,5E44,5E45,5E4C,5E54,5E55,5E5B,5E5E,5E61,5E62,5E72,5E73,5E74,5E76,5E78,5E7A,5E7B,5E7C,5E7D,5E7F,5E80,5E84,5E86,5E87,5E8A,5E8B,5E8F,5E90,5E91,5E93,5E94,5E95,5E96,5E97,5E99,5E9A,5E9C,5E9E,5E9F,5EA0,5EA5,5EA6,5EA7,5EAD,5EB3,5EB5,5EB6,5EB7,5EB8,5EB9,5EBE,5EC9,5ECA,5ED1,5ED2,5ED3,5ED6,5EDB,5EE8,5EEA,5EF4,5EF6,5EF7,5EFA,5EFE,5EFF,5F00,5F01,5F02,5F03,5F04,5F08,5F0A,5F0B,5F0F,5F11,5F13,5F15,5F17,5F18,5F1B,5F1F,5F20,5F25,5F26,5F27,5F29,5F2A,5F2D,5F2F,5F31,5F39,5F3A,5F3C,5F40,5F50,5F52,5F53,5F55,5F56,5F57,5F58,5F5D,5F61,5F62,5F64,5F66,5F69,5F6A,5F6C,5F6D,5F70,5F71,5F73,5F77,5F79,5F7B,5F7C,5F80,5F81,5F82,5F84,5F85,5F87,5F88,5F89,5F8A,5F8B,5F8C,5F90,5F92,5F95,5F97,5F98,5F99,5F9C,5FA1,5FA8,5FAA,5FAD,5FAE,5FB5,5FB7,5FBC,5FBD,5FC3,5FC4,5FC5,5FC6,5FC9,5FCC,5FCD,5FCF,5FD0,5FD1,5FD2,5FD6,5FD7,5FD8,5FD9,5FDD,5FE0,5FE1,5FE4,5FE7,5FEA,5FEB,5FED,5FEE,5FF1,5FF5,5FF8,5FFB,5FFD,5FFE,5FFF,6000,6001,6002,6003,6004,6005,6006,600A,600D,600E,600F,6012,6014,6015,6016,6019,601B,601C,601D,6020,6021,6025,6026,6027,6028,6029,602A,602B,602F,6035,603B,603C,603F,6041,6042,6043,604B,604D,6050,6052,6055,6059,605A,605D,6062,6063,6064,6067,6068,6069,606A,606B,606C,606D,606F,6070,6073,6076,6078,6079,607A,607B,607C,607D,607F,6083,6084,6089,608C,608D,6092,6094,6096,609A,609B,609D,609F,60A0,60A3,60A6,60A8,60AB,60AC,60AD,60AF,60B1,60B2,60B4,60B8,60BB,60BC,60C5,60C6,60CA,60CB,60D1,60D5,60D8,60DA,60DC,60DD,60DF,60E0,60E6,60E7,60E8,60E9,60EB,60EC,60ED,60EE,60EF,60F0,60F3,60F4,60F6,60F9,60FA,6100,6101,6106,6108,6109,610D,610E,610F,6115,611A,611F,6120,6123,6124,6126,6127,612B,613F,6148,614A,614C,614E,6151,6155,615D,6162,6167,6168,6170,6175,6177,618B,618E,6194,619D,61A7,61A8,61A9,61AC,61B7,61BE,61C2,61C8,61CA,61CB,61D1,61D2,61D4,61E6,61F5,61FF,6206,6208,620A,620B,620C,620D,620E,620F,6210,6211,6212,6215,6216,6217,6218,621A,621B,621F,6221,6222,6224,6225,622A,622C,622E,6233,6234,6237,623D,623E,623F,6240,6241,6243,6247,6248,6249,624B,624C,624D,624E,6251,6252,6253,6254,6258,625B,6263,6266,6267,6269,626A,626B,626C,626D,626E,626F,6270,6273,6276,6279,627C,627E,627F,6280,6284,6289,628A,6291,6292,6293,6295,6296,6297,6298,629A,629B,629F,62A0,62A1,62A2,62A4,62A5,62A8,62AB,62AC,62B1,62B5,62B9,62BB,62BC,62BD,62BF,62C2,62C4,62C5,62C6,62C7,62C8,62C9,62CA,62CC,62CD,62CE,62D0,62D2,62D3,62D4,62D6,62D7,62D8,62D9,62DA,62DB,62DC,62DF,62E2,62E3,62E5,62E6,62E7,62E8,62E9,62EC,62ED,62EE,62EF,62F1,62F3,62F4,62F6,62F7,62FC,62FD,62FE,62FF,6301,6302,6307,6308,6309,630E,6311,6316,631A,631B,631D,631E,631F,6320,6321,6322,6323,6324,6325,6328,632A,632B,632F,6332,6339,633A,633D,6342,6343,6345,6346,6349,634B,634C,634D,634E,634F,6350,6355,635E,635F,6361,6362,6363,6367,6369,636D,636E,6371,6376,6377,637A,637B,6380,6382,6387,6388,6389,638A,638C,638E,638F,6390,6392,6396,6398,63A0,63A2,63A3,63A5,63A7,63A8,63A9,63AA,63AC,63AD,63AE,63B0,63B3,63B4,63B7,63B8,63BA,63BC,63BE,63C4,63C6,63C9,63CD,63CE,63CF,63D0,63D2,63D6,63DE,63E0,63E1,63E3,63E9,63EA,63ED,63F2,63F4,63F6,63F8,63FD,63FF,6400,6401,6402,6405,640B,640C,640F,6410,6413,6414,641B,641C,641E,6420,6421,6426,642A,642C,642D,6434,643A,643D,643F,6441,6444,6445,6446,6447,6448,644A,6452,6454,6458,645E,6467,6469,646D,6478,6479,647A,6482,6484,6485,6487,6491,6492,6495,6496,6499,649E,64A4,64A9,64AC,64AD,64AE,64B0,64B5,64B7,64B8,64BA,64BC,64C0,64C2,64C5,64CD,64CE,64D0,64D2,64D7,64D8,64DE,64E2,64E4,64E6,6500,6509,6512,6518,6525,652B,652E,652F,6534,6535,6536,6538,6539,653B,653E,653F,6545,6548,6549,654C,654F,6551,6555,6556,6559,655B,655D,655E,6562,6563,6566,656B,656C,6570,6572,6574,6577,6587,658B,658C,6590,6591,6593,6597,6599,659B,659C,659F,65A1,65A4,65A5,65A7,65A9,65AB,65AD,65AF,65B0,65B9,65BC,65BD,65C1,65C3,65C4,65C5,65C6,65CB,65CC,65CE,65CF,65D2,65D6,65D7,65E0,65E2,65E5,65E6,65E7,65E8,65E9,65EC,65ED,65EE,65EF,65F0,65F1,65F6,65F7,65FA,6600,6602,6603,6606,660A,660C,660E,660F,6613,6614,6615,6619,661D,661F,6620,6625,6627,6628,662D,662F,6631,6634,6635,6636,663C,663E,6641,6643,664B,664C,664F,6652,6653,6654,6655,6656,6657,665A,665F,6661,6664,6666,6668,666E,666F,6670,6674,6676,6677,667A,667E,6682,6684,6687,668C,6691,6696,6697,669D,66A7,66A8,66AE,66B4,66B9,66BE,66D9,66DB,66DC,66DD,66E6,66E9,66F0,66F2,66F3,66F4,66F7,66F9,66FC,66FE,66FF,6700,6708,6709,670A,670B,670D,6710,6714,6715,6717,671B,671D,671F,6726,6728,672A,672B,672C,672D,672F,6731,6734,6735,673A,673D,6740,6742,6743,6746,6748,6749,674C,674E,674F,6750,6751,6753,6756,675C,675E,675F,6760,6761,6765,6768,6769,676A,676D,676F,6770,6772,6773,6775,6777,677C,677E,677F,6781,6784,6787,6789,678B,6790,6795,6797,6798,679A,679C,679D,679E,67A2,67A3,67A5,67A7,67A8,67AA,67AB,67AD,67AF,67B0,67B3,67B5,67B6,67B7,67B8,67C1,67C3,67C4,67CF,67D0,67D1,67D2,67D3,67D4,67D8,67D9,67DA,67DC,67DD,67DE,67E0,67E2,67E5,67E9,67EC,67EF,67F0,67F1,67F3,67F4,67FD,67FF,6800,6805,6807,6808,6809,680A,680B,680C,680E,680F,6811,6813,6816,6817,681D,6821,6829,682A,6832,6833,6837,6838,6839,683C,683D,683E,6840,6841,6842,6843,6844,6845,6846,6848,6849,684A,684C,684E,6850,6851,6853,6854,6855,6860,6861,6862,6863,6864,6865,6866,6867,6868,6869,686B,6874,6876,6877,6881,6883,6885,6886,688F,6893,6897,68A2,68A6,68A7,68A8,68AD,68AF,68B0,68B3,68B5,68C0,68C2,68C9,68CB,68CD,68D2,68D5,68D8,68DA,68E0,68E3,68EE,68F0,68F1,68F5,68F9,68FA,68FC,6901,6905,690B,690D,690E,6910,6912,691F,6920,6924,692D,6930,6934,6939,693D,693F,6942,6954,6957,695A,695D,695E,6960,6963,6966,696B,696E,6971,6977,6978,6979,697C,6980,6982,6984,6986,6987,6988,6989,698D,6994,6995,6998,699B,699C,69A7,69A8,69AB,69AD,69B1,69B4,69B7,69BB,69C1,69CA,69CC,69CE,69D0,69D4,69DB,69DF,69E0,69ED,69F2,69FD,69FF,6A0A,6A17,6A18,6A1F,6A21,6A28,6A2A,6A2F,6A31,6A35,6A3D,6A3E,6A44,6A47,6A50,6A58,6A59,6A5B,6A61,6A65,6A71,6A79,6A7C,6A80,6A84,6A8E,6A90,6A91,6A97,6AA0,6AA9,6AAB,6AAC,6B20,6B21,6B22,6B23,6B24,6B27,6B32,6B37,6B39,6B3A,6B3E,6B43,6B46,6B47,6B49,6B4C,6B59,6B62,6B63,6B64,6B65,6B66,6B67,6B6A,6B79,6B7B,6B7C,6B81,6B82,6B83,6B84,6B86,6B87,6B89,6B8A,6B8B,6B8D,6B92,6B93,6B96,6B9A,6B9B,6BA1,6BAA,6BB3,6BB4,6BB5,6BB7,6BBF,6BC1,6BC2,6BC5,6BCB,6BCD,6BCF,6BD2,6BD3,6BD4,6BD5,6BD6,6BD7,6BD9,6BDB,6BE1,6BEA,6BEB,6BEF,6BF3,6BF5,6BF9,6BFD,6C05,6C06,6C07,6C0D,6C0F,6C10,6C11,6C13,6C14,6C15,6C16,6C18,6C19,6C1A,6C1B,6C1F,6C21,6C22,6C24,6C26,6C27,6C28,6C29,6C2A,6C2E,6C2F,6C30,6C32,6C34,6C35,6C38,6C3D,6C40,6C41,6C42,6C46,6C47,6C49,6C4A,6C50,6C54,6C55,6C57,6C5B,6C5C,6C5D,6C5E,6C5F,6C60,6C61,6C64,6C68,6C69,6C6A,6C70,6C72,6C74,6C76,6C79,6C7D,6C7E,6C81,6C82,6C83,6C85,6C86,6C88,6C89,6C8C,6C8F,6C90,6C93,6C94,6C99,6C9B,6C9F,6CA1,6CA3,6CA4,6CA5,6CA6,6CA7,6CA9,6CAA,6CAB,6CAD,6CAE,6CB1,6CB2,6CB3,6CB8,6CB9,6CBB,6CBC,6CBD,6CBE,6CBF,6CC4,6CC5,6CC9,6CCA,6CCC,6CD0,6CD3,6CD4,6CD5,6CD6,6CD7,6CDB,6CDE,6CE0,6CE1,6CE2,6CE3,6CE5,6CE8,6CEA,6CEB,6CEE,6CEF,6CF0,6CF1,6CF3,6CF5,6CF6,6CF7,6CF8,6CFA,6CFB,6CFC,6CFD,6CFE,6D01,6D04,6D07,6D0B,6D0C,6D0E,6D12,6D17,6D19,6D1A,6D1B,6D1E,6D25,6D27,6D2A,6D2B,6D2E,6D31,6D32,6D33,6D35,6D39,6D3B,6D3C,6D3D,6D3E,6D41,6D43,6D45,6D46,6D47,6D48,6D4A,6D4B,6D4D,6D4E,6D4F,6D51,6D52,6D53,6D54,6D59,6D5A,6D5C,6D5E,6D60,6D63,6D66,6D69,6D6A,6D6E,6D6F,6D74,6D77,6D78,6D7C,6D82,6D85,6D88,6D89,6D8C,6D8E,6D91,6D93,6D94,6D95,6D9B,6D9D,6D9E,6D9F,6DA0,6DA1,6DA3,6DA4,6DA6,6DA7,6DA8,6DA9,6DAA,6DAB,6DAE,6DAF,6DB2,6DB5,6DB8,6DBF,6DC0,6DC4,6DC5,6DC6,6DC7,6DCB,6DCC,6DD1,6DD6,6DD8,6DD9,6DDD,6DDE,6DE0,6DE1,6DE4,6DE6,6DEB,6DEC,6DEE,6DF1,6DF3,6DF7,6DF9,6DFB,6DFC,6E05,6E0A,6E0C,6E0D,6E0E,6E10,6E11,6E14,6E16,6E17,6E1A,6E1D,6E20,6E21,6E23,6E24,6E25,6E29,6E2B,6E2D,6E2F,6E32,6E34,6E38,6E3A,6E43,6E44,6E4D,6E4E,6E53,6E54,6E56,6E58,6E5B,6E5F,6E6B,6E6E,6E7E,6E7F,6E83,6E85,6E86,6E89,6E8F,6E90,6E98,6E9C,6E9F,6EA2,6EA5,6EA7,6EAA,6EAF,6EB1,6EB2,6EB4,6EB6,6EB7,6EBA,6EBB,6EBD,6EC1,6EC2,6EC7,6ECB,6ECF,6ED1,6ED3,6ED4,6ED5,6ED7,6EDA,6EDE,6EDF,6EE0,6EE1,6EE2,6EE4,6EE5,6EE6,6EE8,6EE9,6EF4,6EF9,6F02,6F06,6F09,6F0F,6F13,6F14,6F15,6F20,6F24,6F29,6F2A,6F2B,6F2D,6F2F,6F31,6F33,6F36,6F3E,6F46,6F47,6F4B,6F4D,6F58,6F5C,6F5E,6F62,6F66,6F6D,6F6E,6F72,6F74,6F78,6F7A,6F7C,6F84,6F88,6F89,6F8C,6F8D,6F8E,6F9C,6FA1,6FA7,6FB3,6FB6,6FB9,6FC0,6FC2,6FC9,6FD1,6FD2,6FDE,6FE0,6FE1,6FEE,6FEF,7011,701A,701B,7023,7035,7039,704C,704F,705E,706B,706C,706D,706F,7070,7075,7076,7078,707C,707E,707F,7080,7085,7089,708A,708E,7092,7094,7095,7096,7099,709C,709D,70AB,70AC,70AD,70AE,70AF,70B1,70B3,70B7,70B8,70B9,70BB,70BC,70BD,70C0,70C1,70C2,70C3,70C8,70CA,70D8,70D9,70DB,70DF,70E4,70E6,70E7,70E8,70E9,70EB,70EC,70ED,70EF,70F7,70F9,70FD,7109,710A,7110,7113,7115,7116,7118,7119,711A,7126,712F,7130,7131,7136,7145,714A,714C,714E,715C,715E,7164,7166,7167,7168,716E,7172,7173,7178,717A,717D,7184,718A,718F,7194,7198,7199,719F,71A0,71A8,71AC,71B3,71B5,71B9,71C3,71CE,71D4,71D5,71E0,71E5,71E7,71EE,71F9,7206,721D,7228,722A,722C,7230,7231,7235,7236,7237,7238,7239,723B,723D,723F,7247,7248,724C,724D,7252,7256,7259,725B,725D,725F,7261,7262,7266,7267,7269,726E,726F,7272,7275,7279,727A,727E,727F,7280,7281,7284,728A,728B,728D,728F,7292,729F,72AC,72AD,72AF,72B0,72B4,72B6,72B7,72B8,72B9,72C1,72C2,72C3,72C4,72C8,72CD,72CE,72D0,72D2,72D7,72D9,72DE,72E0,72E1,72E8,72E9,72EC,72ED,72EE,72EF,72F0,72F1,72F2,72F3,72F4,72F7,72F8,72FA,72FB,72FC,7301,7303,730A,730E,7313,7315,7316,7317,731B,731C,731D,731E,7321,7322,7325,7329,732A,732B,732C,732E,7331,7334,7337,7338,7339,733E,733F,734D,7350,7352,7357,7360,736C,736D,736F,737E,7384,7387,7389,738B,738E,7391,7396,739B,739F,73A2,73A9,73AB,73AE,73AF,73B0,73B2,73B3,73B7,73BA,73BB,73C0,73C2,73C8,73C9,73CA,73CD,73CF,73D0,73D1,73D9,73DE,73E0,73E5,73E7,73E9,73ED,73F2,7403,7405,7406,7409,740A,740F,7410,741A,741B,7422,7425,7426,7428,742A,742C,742E,7430,7433,7434,7435,7436,743C,7441,7455,7457,7459,745A,745B,745C,745E,745F,746D,7470,7476,7477,747E,7480,7481,7483,7487,748B,748E,7490,749C,749E,74A7,74A8,74A9,74BA,74D2,74DC,74DE,74E0,74E2,74E3,74E4,74E6,74EE,74EF,74F4,74F6,74F7,74FF,7504,750D,750F,7511,7513,7518,7519,751A,751C,751F,7525,7528,7529,752B,752C,752D,752F,7530,7531,7532,7533,7535,7537,7538,753A,753B,753E,7540,7545,7548,754B,754C,754E,754F,7554,7559,755A,755B,755C,7565,7566,756A,7572,7574,7578,7579,757F,7583,7586,758B,758F,7591,7592,7594,7596,7597,7599,759A,759D,759F,75A0,75A1,75A3,75A4,75A5,75AB,75AC,75AE,75AF,75B0,75B1,75B2,75B3,75B4,75B5,75B8,75B9,75BC,75BD,75BE,75C2,75C3,75C4,75C5,75C7,75C8,75C9,75CA,75CD,75D2,75D4,75D5,75D6,75D8,75DB,75DE,75E2,75E3,75E4,75E6,75E7,75E8,75EA,75EB,75F0,75F1,75F4,75F9,75FC,75FF,7600,7601,7603,7605,760A,760C,7610,7615,7617,7618,7619,761B,761F,7620,7622,7624,7625,7626,7629,762A,762B,762D,7630,7633,7634,7635,7638,763C,763E,763F,7640,7643,764C,764D,7654,7656,765C,765E,7663,766B,766F,7678,767B,767D,767E,7682,7684,7686,7687,7688,768B,768E,7691,7693,7696,7699,76A4,76AE,76B1,76B2,76B4,76BF,76C2,76C5,76C6,76C8,76CA,76CD,76CE,76CF,76D0,76D1,76D2,76D4,76D6,76D7,76D8,76DB,76DF,76E5,76EE,76EF,76F1,76F2,76F4,76F8,76F9,76FC,76FE,7701,7704,7707,7708,7709,770B,770D,7719,771A,771F,7720,7722,7726,7728,7729,772D,772F,7735,7736,7737,7738,773A,773C,7740,7741,7743,7747,7750,7751,775A,775B,7761,7762,7763,7765,7766,7768,776B,776C,7779,777D,777E,777F,7780,7784,7785,778C,778D,778E,7791,7792,779F,77A0,77A2,77A5,77A7,77A9,77AA,77AC,77B0,77B3,77B5,77BB,77BD,77BF,77CD,77D7,77DB,77DC,77E2,77E3,77E5,77E7,77E9,77EB,77EC,77ED,77EE,77F3,77F6,77F8,77FD,77FE,77FF,7800,7801,7802,7809,780C,780D,7811,7812,7814,7816,7817,7818,781A,781C,781D,781F,7823,7825,7826,7827,7829,782C,782D,7830,7834,7837,7838,7839,783A,783B,783C,783E,7840,7845,7847,784C,784E,7850,7852,7855,7856,7857,785D,786A,786B,786C,786D,786E,7877,787C,7887,7889,788C,788D,788E,7891,7893,7897,7898,789A,789B,789C,789F,78A1,78A3,78A5,78A7,78B0,78B1,78B2,78B3,78B4,78B9,78BE,78C1,78C5,78C9,78CA,78CB,78D0,78D4,78D5,78D9,78E8,78EC,78F2,78F4,78F7,78FA,7901,7905,7913,791E,7924,7934,793A,793B,793C,793E,7940,7941,7946,7948,7949,7953,7956,7957,795A,795B,795C,795D,795E,795F,7960,7962,7965,7967,7968,796D,796F,7977,7978,797A,7980,7981,7984,7985,798A,798F,799A,79A7,79B3,79B9,79BA,79BB,79BD,79BE,79C0,79C1,79C3,79C6,79C9,79CB,79CD,79D1,79D2,79D5,79D8,79DF,79E3,79E4,79E6,79E7,79E9,79EB,79ED,79EF,79F0,79F8,79FB,79FD,7A00,7A02,7A03,7A06,7A0B,7A0D,7A0E,7A14,7A17,7A1A,7A1E,7A20,7A23,7A33,7A37,7A39,7A3B,7A3C,7A3D,7A3F,7A46,7A51,7A57,7A70,7A74,7A76,7A77,7A78,7A79,7A7A,7A7F,7A80,7A81,7A83,7A84,7A86,7A88,7A8D,7A91,7A92,7A95,7A96,7A97,7A98,7A9C,7A9D,7A9F,7AA0,7AA5,7AA6,7AA8,7AAC,7AAD,7AB3,7ABF,7ACB,7AD6,7AD9,7ADE,7ADF,7AE0,7AE3,7AE5,7AE6,7AED,7AEF,7AF9,7AFA,7AFD,7AFF,7B03,7B04,7B06,7B08,7B0A,7B0B,7B0F,7B11,7B14,7B15,7B19,7B1B,7B1E,7B20,7B24,7B25,7B26,7B28,7B2A,7B2B,7B2C,7B2E,7B31,7B33,7B38,7B3A,7B3C,7B3E,7B45,7B47,7B49,7B4B,7B4C,7B4F,7B50,7B51,7B52,7B54,7B56,7B58,7B5A,7B5B,7B5D,7B60,7B62,7B6E,7B71,7B72,7B75,7B77,7B79,7B7B,7B7E,7B80,7B85,7B8D,7B90,7B94,7B95,7B97,7B9C,7B9D,7BA1,7BA2,7BA6,7BA7,7BA8,7BA9,7BAA,7BAB,7BAC,7BAD,7BB1,7BB4,7BB8,7BC1,7BC6,7BC7,7BCC,7BD1,7BD3,7BD9,7BDA,7BDD,7BE1,7BE5,7BE6,7BEA,7BEE,7BF1,7BF7,7BFC,7BFE,7C07,7C0B,7C0C,7C0F,7C16,7C1F,7C26,7C27,7C2A,7C38,7C3F,7C40,7C41,7C4D,7C73,7C74,7C7B,7C7C,7C7D,7C89,7C91,7C92,7C95,7C97,7C98,7C9C,7C9D,7C9E,7C9F,7CA2,7CA4,7CA5,7CAA,7CAE,7CB1,7CB2,7CB3,7CB9,7CBC,7CBD,7CBE,7CC1,7CC5,7CC7,7CC8,7CCA,7CCC,7CCD,7CD5,7CD6,7CD7,7CD9,7CDC,7CDF,7CE0,7CE8,7CEF,7CF8,7CFB,7D0A,7D20,7D22,7D27,7D2B,7D2F,7D6E,7D77,7DA6,7DAE,7E3B,7E41,7E47,7E82,7E9B,7E9F,7EA0,7EA1,7EA2,7EA3,7EA4,7EA5,7EA6,7EA7,7EA8,7EA9,7EAA,7EAB,7EAC,7EAD,7EAF,7EB0,7EB1,7EB2,7EB3,7EB5,7EB6,7EB7,7EB8,7EB9,7EBA,7EBD,7EBE,7EBF,7EC0,7EC1,7EC2,7EC3,7EC4,7EC5,7EC6,7EC7,7EC8,7EC9,7ECA,7ECB,7ECC,7ECD,7ECE,7ECF,7ED0,7ED1,7ED2,7ED3,7ED4,7ED5,7ED7,7ED8,7ED9,7EDA,7EDB,7EDC,7EDD,7EDE,7EDF,7EE0,7EE1,7EE2,7EE3,7EE5,7EE6,7EE7,7EE8,7EE9,7EEA,7EEB,7EED,7EEE,7EEF,7EF0,7EF1,7EF2,7EF3,7EF4,7EF5,7EF6,7EF7,7EF8,7EFA,7EFB,7EFC,7EFD,7EFE,7EFF,7F00,7F01,7F02,7F03,7F04,7F05,7F06,7F07,7F08,7F09,7F0B,7F0C,7F0D,7F0E,7F0F,7F11,7F12,7F13,7F14,7F15,7F16,7F17,7F18,7F19,7F1A,7F1B,7F1C,7F1D,7F1F,7F20,7F21,7F22,7F23,7F24,7F25,7F26,7F27,7F28,7F29,7F2A,7F2B,7F2C,7F2D,7F2E,7F2F,7F30,7F31,7F32,7F33,7F34,7F35,7F36,7F38,7F3A,7F42,7F44,7F45,7F50,7F51,7F54,7F55,7F57,7F58,7F5A,7F5F,7F61,7F62,7F68,7F69,7F6A,7F6E,7F71,7F72,7F74,7F79,7F7E,7F81,7F8A,7F8C,7F8E,7F94,7F9A,7F9D,7F9E,7F9F,7FA1,7FA4,7FA7,7FAF,7FB0,7FB2,7FB8,7FB9,7FBC,7FBD,7FBF,7FC1,7FC5,7FCA,7FCC,7FCE,7FD4,7FD5,7FD8,7FDF,7FE0,7FE1,7FE5,7FE6,7FE9,7FEE,7FF0,7FF1,7FF3,7FFB,7FFC,8000,8001,8003,8004,8005,8006,800B,800C,800D,8010,8012,8014,8015,8016,8017,8018,8019,801C,8020,8022,8025,8026,8027,8028,8029,802A,8031,8033,8035,8036,8037,8038,803B,803D,803F,8042,8043,8046,804A,804B,804C,804D,8052,8054,8058,805A,8069,806A,8071,807F,8080,8083,8084,8086,8087,8089,808B,808C,8093,8096,8098,809A,809B,809C,809D,809F,80A0,80A1,80A2,80A4,80A5,80A9,80AA,80AB,80AD,80AE,80AF,80B1,80B2,80B4,80B7,80BA,80BC,80BD,80BE,80BF,80C0,80C1,80C2,80C3,80C4,80C6,80CC,80CD,80CE,80D6,80D7,80D9,80DA,80DB,80DC,80DD,80DE,80E1,80E4,80E5,80E7,80E8,80E9,80EA,80EB,80EC,80ED,80EF,80F0,80F1,80F2,80F3,80F4,80F6,80F8,80FA,80FC,80FD,8102,8106,8109,810A,810D,810E,810F,8110,8111,8112,8113,8114,8116,8118,811A,811E,812C,812F,8131,8132,8136,8138,813E,8146,8148,814A,814B,814C,8150,8151,8153,8154,8155,8159,815A,8160,8165,8167,8169,816D,816E,8170,8171,8174,8179,817A,817B,817C,817D,817E,817F,8180,8182,8188,818A,818F,8191,8198,819B,819C,819D,81A3,81A6,81A8,81AA,81B3,81BA,81BB,81C0,81C1,81C2,81C3,81C6,81CA,81CC,81E3,81E7,81EA,81EC,81ED,81F3,81F4,81FB,81FC,81FE,8200,8201,8202,8204,8205,8206,820C,820D,8210,8212,8214,821B,821C,821E,821F,8221,8222,8223,8228,822A,822B,822C,822D,822F,8230,8231,8233,8234,8235,8236,8237,8238,8239,823B,823E,8244,8247,8249,824B,824F,8258,825A,825F,8268,826E,826F,8270,8272,8273,8274,8279,827A,827D,827E,827F,8282,8284,8288,828A,828B,828D,828E,828F,8291,8292,8297,8298,8299,829C,829D,829F,82A1,82A4,82A5,82A6,82A8,82A9,82AA,82AB,82AC,82AD,82AE,82AF,82B0,82B1,82B3,82B4,82B7,82B8,82B9,82BD,82BE,82C1,82C4,82C7,82C8,82CA,82CB,82CC,82CD,82CE,82CF,82D1,82D2,82D3,82D4,82D5,82D7,82D8,82DB,82DC,82DE,82DF,82E0,82E1,82E3,82E4,82E5,82E6,82EB,82EF,82F1,82F4,82F7,82F9,82FB,8301,8302,8303,8304,8305,8306,8307,8308,8309,830C,830E,830F,8311,8314,8315,8317,831A,831B,831C,8327,8328,832B,832C,832D,832F,8331,8333,8334,8335,8336,8338,8339,833A,833C,8340,8343,8346,8347,8349,834F,8350,8351,8352,8354,835A,835B,835C,835E,835F,8360,8361,8363,8364,8365,8366,8367,8368,8369,836A,836B,836C,836D,836E,836F,8377,8378,837B,837C,837D,8385,8386,8389,838E,8392,8393,8398,839B,839C,839E,83A0,83A8,83A9,83AA,83AB,83B0,83B1,83B2,83B3,83B4,83B6,83B7,83B8,83B9,83BA,83BC,83BD,83C0,83C1,83C5,83C7,83CA,83CC,83CF,83D4,83D6,83D8,83DC,83DD,83DF,83E0,83E1,83E5,83E9,83EA,83F0,83F1,83F2,83F8,83F9,83FD,8401,8403,8404,8406,840B,840C,840D,840E,840F,8411,8418,841C,841D,8424,8425,8426,8427,8428,8431,8438,843C,843D,8446,8451,8457,8459,845A,845B,845C,8461,8463,8469,846B,846C,846D,8471,8473,8475,8476,8478,847A,8482,8487,8488,8489,848B,848C,848E,8497,8499,849C,84A1,84AF,84B2,84B4,84B8,84B9,84BA,84BD,84BF,84C1,84C4,84C9,84CA,84CD,84D0,84D1,84D3,84D6,84DD,84DF,84E0,84E3,84E5,84E6,84EC,84F0,84FC,84FF,850C,8511,8513,8517,851A,851F,8521,852B,852C,8537,8538,8539,853A,853B,853C,853D,8543,8548,8549,854A,8556,8559,855E,8564,8568,8572,8574,8579,857A,857B,857E,8584,8585,8587,858F,859B,859C,85A4,85A8,85AA,85AE,85AF,85B0,85B7,85B9,85C1,85C9,85CF,85D0,85D3,85D5,85DC,85E4,85E9,85FB,85FF,8605,8611,8616,8627,8629,8638,863C,864D,864E,864F,8650,8651,8654,865A,865E,8662,866B,866C,866E,8671,8679,867A,867B,867C,867D,867E,867F,8680,8681,8682,868A,868B,868C,868D,8693,8695,869C,869D,86A3,86A4,86A7,86A8,86A9,86AA,86AC,86AF,86B0,86B1,86B4,86B5,86B6,86BA,86C0,86C4,86C6,86C7,86C9,86CA,86CB,86CE,86CF,86D0,86D1,86D4,86D8,86D9,86DB,86DE,86DF,86E4,86E9,86ED,86EE,86F0,86F1,86F2,86F3,86F4,86F8,86F9,86FE,8700,8702,8703,8707,8708,8709,870A,870D,8712,8713,8715,8717,8718,871A,871C,871E,8721,8722,8723,8725,8729,872E,8731,8734,8737,873B,873E,873F,8747,8748,8749,874C,874E,8753,8757,8759,8760,8763,8764,8765,876E,8770,8774,8776,877B,877C,877D,877E,8782,8783,8785,8788,878B,878D,8793,8797,879F,87A8,87AB,87AC,87AD,87AF,87B3,87B5,87BA,87BD,87C0,87C6,87CA,87CB,87D1,87D2,87D3,87DB,87E0,87E5,87EA,87EE,87F9,87FE,8803,880A,8813,8815,8816,881B,8821,8822,8832,8839,883C,8840,8844,8845,884C,884D,8854,8857,8859,8861,8862,8863,8864,8865,8868,8869,886B,886C,886E,8870,8872,8877,887D,887E,887F,8881,8882,8884,8885,8888,888B,888D,8892,8896,889C,88A2,88A4,88AB,88AD,88B1,88B7,88BC,88C1,88C2,88C5,88C6,88C9,88CE,88D2,88D4,88D5,88D8,88D9,88DF,88E2,88E3,88E4,88E5,88E8,88F0,88F1,88F3,88F4,88F8,88F9,88FC,88FE,8902,890A,8910,8912,8913,8919,891A,891B,8921,8925,892A,892B,8930,8934,8936,8941,8944,895E,895F,8966,897B,897F,8981,8983,8986,89C1,89C2,89C4,89C5,89C6,89C7,89C8,89C9,89CA,89CB,89CC,89CE,89CF,89D0,89D1,89D2,89D6,89DA,89DC,89DE,89E3,89E5,89E6,89EB,89EF,89F3,8A00,8A07,8A3E,8A48,8A79,8A89,8A8A,8A93,8B07,8B26,8B66,8B6C,8BA0,8BA1,8BA2,8BA3,8BA4,8BA5,8BA6,8BA7,8BA8,8BA9,8BAA,8BAB,8BAD,8BAE,8BAF,8BB0,8BB2,8BB3,8BB4,8BB5,8BB6,8BB7,8BB8,8BB9,8BBA,8BBC,8BBD,8BBE,8BBF,8BC0,8BC1,8BC2,8BC3,8BC4,8BC5,8BC6,8BC8,8BC9,8BCA,8BCB,8BCC,8BCD,8BCE,8BCF,8BD1,8BD2,8BD3,8BD4,8BD5,8BD6,8BD7,8BD8,8BD9,8BDA,8BDB,8BDC,8BDD,8BDE,8BDF,8BE0,8BE1,8BE2,8BE3,8BE4,8BE5,8BE6,8BE7,8BE8,8BE9,8BEB,8BEC,8BED,8BEE,8BEF,8BF0,8BF1,8BF2,8BF3,8BF4,8BF5,8BF6,8BF7,8BF8,8BF9,8BFA,8BFB,8BFC,8BFD,8BFE,8BFF,8C00,8C01,8C02,8C03,8C04,8C05,8C06,8C07,8C08,8C0A,8C0B,8C0C,8C0D,8C0E,8C0F,8C10,8C11,8C12,8C13,8C14,8C15,8C16,8C17,8C18,8C19,8C1A,8C1B,8C1C,8C1D,8C1F,8C20,8C21,8C22,8C23,8C24,8C25,8C26,8C27,8C28,8C29,8C2A,8C2B,8C2C,8C2D,8C2E,8C2F,8C30,8C31,8C32,8C33,8C34,8C35,8C36,8C37,8C41,8C46,8C47,8C49,8C4C,8C55,8C5A,8C61,8C62,8C6A,8C6B,8C73,8C78,8C79,8C7A,8C82,8C85,8C89,8C8A,8C8C,8C94,8C98,8D1D,8D1E,8D1F,8D21,8D22,8D23,8D24,8D25,8D26,8D27,8D28,8D29,8D2A,8D2B,8D2C,8D2D,8D2E,8D2F,8D30,8D31,8D32,8D33,8D34,8D35,8D36,8D37,8D38,8D39,8D3A,8D3B,8D3C,8D3D,8D3E,8D3F,8D40,8D41,8D42,8D43,8D44,8D45,8D46,8D47,8D48,8D49,8D4A,8D4B,8D4C,8D4D,8D4E,8D4F,8D50,8D53,8D54,8D55,8D56,8D58,8D59,8D5A,8D5B,8D5C,8D5D,8D5E,8D60,8D61,8D62,8D63,8D64,8D66,8D67,8D6B,8D6D,8D70,8D73,8D74,8D75,8D76,8D77,8D81,8D84,8D85,8D8A,8D8B,8D91,8D94,8D9F,8DA3,8DB1,8DB3,8DB4,8DB5,8DB8,8DBA,8DBC,8DBE,8DBF,8DC3,8DC4,8DC6,8DCB,8DCC,8DCE,8DCF,8DD1,8DD6,8DD7,8DDA,8DDB,8DDD,8DDE,8DDF,8DE3,8DE4,8DE8,8DEA,8DEB,8DEC,8DEF,8DF3,8DF5,8DF7,8DF8,8DF9,8DFA,8DFB,8DFD,8E05,8E09,8E0A,8E0C,8E0F,8E14,8E1D,8E1E,8E1F,8E22,8E23,8E29,8E2A,8E2C,8E2E,8E2F,8E31,8E35,8E39,8E3A,8E3D,8E40,8E41,8E42,8E44,8E47,8E48,8E49,8E4A,8E4B,8E51,8E52,8E59,8E66,8E69,8E6C,8E6D,8E6F,8E70,8E72,8E74,8E76,8E7C,8E7F,8E81,8E85,8E87,8E8F,8E90,8E94,8E9C,8E9E,8EAB,8EAC,8EAF,8EB2,8EBA,8ECE,8F66,8F67,8F68,8F69,8F6B,8F6C,8F6D,8F6E,8F6F,8F70,8F71,8F72,8F73,8F74,8F75,8F76,8F77,8F78,8F79,8F7A,8F7B,8F7C,8F7D,8F7E,8F7F,8F81,8F82,8F83,8F84,8F85,8F86,8F87,8F88,8F89,8F8A,8F8B,8F8D,8F8E,8F8F,8F90,8F91,8F93,8F94,8F95,8F96,8F97,8F98,8F99,8F9A,8F9B,8F9C,8F9E,8F9F,8FA3,8FA8,8FA9,8FAB,8FB0,8FB1,8FB6,8FB9,8FBD,8FBE,8FC1,8FC2,8FC4,8FC5,8FC7,8FC8,8FCE,8FD0,8FD1,8FD3,8FD4,8FD5,8FD8,8FD9,8FDB,8FDC,8FDD,8FDE,8FDF,8FE2,8FE4,8FE5,8FE6,8FE8,8FE9,8FEA,8FEB,8FED,8FEE,8FF0,8FF3,8FF7,8FF8,8FF9,8FFD,9000,9001,9002,9003,9004,9005,9006,9009,900A,900B,900D,900F,9010,9011,9012,9014,9016,9017,901A,901B,901D,901E,901F,9020,9021,9022,9026,902D,902E,902F,9035,9036,9038,903B,903C,903E,9041,9042,9044,9047,904D,904F,9050,9051,9052,9053,9057,9058,905B,9062,9063,9065,9068,906D,906E,9074,9075,907D,907F,9080,9082,9083,9088,908B,9091,9093,9095,9097,9099,909B,909D,90A1,90A2,90A3,90A6,90AA,90AC,90AE,90AF,90B0,90B1,90B3,90B4,90B5,90B6,90B8,90B9,90BA,90BB,90BE,90C1,90C4,90C5,90C7,90CA,90CE,90CF,90D0,90D1,90D3,90D7,90DB,90DC,90DD,90E1,90E2,90E6,90E7,90E8,90EB,90ED,90EF,90F4,90F8,90FD,90FE,9102,9104,9119,911E,9122,9123,912F,9131,9139,9143,9146,9149,914A,914B,914C,914D,914E,914F,9150,9152,9157,915A,915D,915E,9161,9162,9163,9164,9165,9169,916A,916C,916E,916F,9170,9171,9172,9174,9175,9176,9177,9178,9179,917D,917E,917F,9185,9187,9189,918B,918C,918D,9190,9191,9192,919A,919B,91A2,91A3,91AA,91AD,91AE,91AF,91B4,91B5,91BA,91C7,91C9,91CA,91CC,91CD,91CE,91CF,91D1,91DC,9274,928E,92AE,92C8,933E,936A,938F,93CA,93D6,943E,946B,9485,9486,9487,9488,9489,948A,948B,948C,948D,948E,948F,9490,9492,9493,9494,9495,9497,9499,949A,949B,949C,949D,949E,949F,94A0,94A1,94A2,94A3,94A4,94A5,94A6,94A7,94A8,94A9,94AA,94AB,94AC,94AD,94AE,94AF,94B0,94B1,94B2,94B3,94B4,94B5,94B6,94B7,94B8,94B9,94BA,94BB,94BC,94BD,94BE,94BF,94C0,94C1,94C2,94C3,94C4,94C5,94C6,94C8,94C9,94CA,94CB,94CC,94CD,94CE,94D0,94D1,94D2,94D5,94D6,94D7,94D8,94D9,94DB,94DC,94DD,94DE,94DF,94E0,94E1,94E2,94E3,94E4,94E5,94E7,94E8,94E9,94EA,94EB,94EC,94ED,94EE,94EF,94F0,94F1,94F2,94F3,94F4,94F5,94F6,94F7,94F8,94F9,94FA,94FC,94FD,94FE,94FF,9500,9501,9502,9503,9504,9505,9506,9507,9508,9509,950A,950B,950C,950D,950E,950F,9510,9511,9512,9513,9514,9515,9516,9517,9518,9519,951A,951B,951D,951E,951F,9521,9522,9523,9524,9525,9526,9528,9529,952A,952B,952C,952D,952E,952F,9530,9531,9532,9534,9535,9536,9537,9538,9539,953A,953B,953C,953E,953F,9540,9541,9542,9544,9545,9546,9547,9549,954A,954C,954D,954E,954F,9550,9551,9552,9553,9554,9556,9557,9558,9559,955B,955C,955D,955E,955F,9561,9562,9563,9564,9565,9566,9567,9568,9569,956A,956B,956C,956D,956F,9570,9571,9572,9573,9576,957F,95E8,95E9,95EA,95EB,95ED,95EE,95EF,95F0,95F1,95F2,95F3,95F4,95F5,95F6,95F7,95F8,95F9,95FA,95FB,95FC,95FD,95FE,9600,9601,9602,9603,9604,9605,9606,9608,9609,960A,960B,960C,960D,960E,960F,9610,9611,9612,9614,9615,9616,9617,9619,961A,961C,961D,961F,9621,9622,962A,962E,9631,9632,9633,9634,9635,9636,963B,963C,963D,963F,9640,9642,9644,9645,9646,9647,9648,9649,964B,964C,964D,9650,9654,9655,965B,965F,9661,9662,9664,9667,9668,9669,966A,966C,9672,9674,9675,9676,9677,9685,9686,9688,968B,968D,968F,9690,9694,9697,9698,9699,969C,96A7,96B0,96B3,96B6,96B9,96BC,96BD,96BE,96C0,96C1,96C4,96C5,96C6,96C7,96C9,96CC,96CD,96CE,96CF,96D2,96D5,96E0,96E8,96E9,96EA,96EF,96F3,96F6,96F7,96F9,96FE,9700,9701,9704,9706,9707,9708,9709,970D,970E,970F,9713,9716,971C,971E,972A,972D,9730,9732,9738,9739,973E,9752,9753,9756,9759,975B,975E,9760,9761,9762,9765,9769,9773,9774,9776,977C,9785,978B,978D,9791,9792,9794,9798,97A0,97A3,97AB,97AD,97AF,97B2,97B4,97E6,97E7,97E9,97EA,97EB,97EC,97ED,97F3,97F5,97F6,9875,9876,9877,9878,9879,987A,987B,987C,987D,987E,987F,9880,9881,9882,9883,9884,9885,9886,9887,9888,9889,988A,988C,988D,988F,9890,9891,9893,9894,9896,9897,9898,989A,989B,989C,989D,989E,989F,98A0,98A1,98A2,98A4,98A5,98A6,98A7,98CE,98D1,98D2,98D3,98D5,98D8,98D9,98DA,98DE,98DF,98E7,98E8,990D,9910,992E,9954,9955,9963,9965,9967,9968,9969,996A,996B,996C,996D,996E,996F,9970,9971,9972,9974,9975,9976,9977,997A,997C,997D,997F,9980,9981,9984,9985,9986,9987,9988,998A,998B,998D,998F,9990,9991,9992,9993,9994,9995,9996,9997,9998,9999,99A5,99A8,9A6C,9A6D,9A6E,9A6F,9A70,9A71,9A73,9A74,9A75,9A76,9A77,9A78,9A79,9A7A,9A7B,9A7C,9A7D,9A7E,9A7F,9A80,9A81,9A82,9A84,9A85,9A86,9A87,9A88,9A8A,9A8B,9A8C,9A8F,9A90,9A91,9A92,9A93,9A96,9A97,9A98,9A9A,9A9B,9A9C,9A9D,9A9E,9A9F,9AA0,9AA1,9AA2,9AA3,9AA4,9AA5,9AA7,9AA8,9AB0,9AB1,9AB6,9AB7,9AB8,9ABA,9ABC,9AC0,9AC1,9AC2,9AC5,9ACB,9ACC,9AD1,9AD3,9AD8,9ADF,9AE1,9AE6,9AEB,9AED,9AEF,9AF9,9AFB,9B03,9B08,9B0F,9B13,9B1F,9B23,9B2F,9B32,9B3B,9B3C,9B41,9B42,9B43,9B44,9B45,9B47,9B48,9B49,9B4D,9B4F,9B51,9B54,9C7C,9C7F,9C81,9C82,9C85,9C86,9C87,9C88,9C8B,9C8D,9C8E,9C90,9C91,9C92,9C94,9C95,9C9A,9C9B,9C9C,9C9E,9C9F,9CA0,9CA1,9CA2,9CA3,9CA4,9CA5,9CA6,9CA7,9CA8,9CA9,9CAB,9CAD,9CAE,9CB0,9CB1,9CB2,9CB3,9CB4,9CB5,9CB6,9CB7,9CB8,9CBA,9CBB,9CBC,9CBD,9CC3,9CC4,9CC5,9CC6,9CC7,9CCA,9CCB,9CCC,9CCD,9CCE,9CCF,9CD0,9CD3,9CD4,9CD5,9CD6,9CD7,9CD8,9CD9,9CDC,9CDD,9CDE,9CDF,9CE2,9E1F,9E20,9E21,9E22,9E23,9E25,9E26,9E28,9E29,9E2A,9E2B,9E2C,9E2D,9E2F,9E31,9E32,9E33,9E35,9E36,9E37,9E38,9E39,9E3A,9E3D,9E3E,9E3F,9E41,9E42,9E43,9E44,9E45,9E46,9E47,9E48,9E49,9E4A,9E4B,9E4C,9E4E,9E4F,9E51,9E55,9E57,9E58,9E5A,9E5B,9E5C,9E5E,9E63,9E64,9E66,9E67,9E68,9E69,9E6A,9E6B,9E6C,9E6D,9E70,9E71,9E73,9E7E,9E7F,9E82,9E87,9E88,9E8B,9E92,9E93,9E9D,9E9F,9EA6,9EB4,9EB8,9EBB,9EBD,9EBE,9EC4,9EC9,9ECD,9ECE,9ECF,9ED1,9ED4,9ED8,9EDB,9EDC,9EDD,9EDF,9EE0,9EE2,9EE5,9EE7,9EE9,9EEA,9EEF,9EF9,9EFB,9EFC,9EFE,9F0B,9F0D,9F0E,9F10,9F13,9F17,9F19,9F20,9F22,9F2C,9F2F,9F37,9F39,9F3B,9F3D,9F3E,9F44,9F50,9F51,9F7F,9F80,9F83,9F84,9F85,9F86,9F87,9F88,9F89,9F8A,9F8B,9F8C,9F99,9F9A,9F9B,9F9F,9FA0,FF01,FF02,FF03,FF04,FF05,FF06,FF07,FF08,FF09,FF0A,FF0B,FF0C,FF0D,FF0E,FF0F,FF10,FF11,FF12,FF13,FF14,FF15,FF16,FF17,FF18,FF19,FF1A,FF1B,FF1C,FF1D,FF1E,FF1F,FF20,FF21,FF22,FF23,FF24,FF25,FF26,FF27,FF28,FF29,FF2A,FF2B,FF2C,FF2D,FF2E,FF2F,FF30,FF31,FF32,FF33,FF34,FF35,FF36,FF37,FF38,FF39,FF3A,FF3B,FF3C,FF3D,FF3E,FF3F,FF40,FF41,FF42,FF43,FF44,FF45,FF46,FF47,FF48,FF49,FF4A,FF4B,FF4C,FF4D,FF4E,FF4F,FF50,FF51,FF52,FF53,FF54,FF55,FF56,FF57,FF58,FF59,FF5A,FF5B,FF5C,FF5D,FF5E,FFE0,FFE1,FFE3,FFE5';  
        }  
        AnsicodeChr = function(){  
            return 'A1E8,A1EC,A1A7,A1E3,A1C0,A1A4,A1C1,A8A4,A8A2,A8A8,A8A6,A8BA,A8AC,A8AA,A8B0,A8AE,A1C2,A8B4,A8B2,A8B9,A8A1,A8A5,A8A7,A8A9,A8AD,A8B1,A8A3,A8AB,A8AF,A8B3,A8B5,A8B6,A8B7,A8B8,A1A6,A1A5,A6A1,A6A2,A6A3,A6A4,A6A5,A6A6,A6A7,A6A8,A6A9,A6AA,A6AB,A6AC,A6AD,A6AE,A6AF,A6B0,A6B1,A6B2,A6B3,A6B4,A6B5,A6B6,A6B7,A6B8,A6C1,A6C2,A6C3,A6C4,A6C5,A6C6,A6C7,A6C8,A6C9,A6CA,A6CB,A6CC,A6CD,A6CE,A6CF,A6D0,A6D1,A6D2,A6D3,A6D4,A6D5,A6D6,A6D7,A6D8,A7A7,A7A1,A7A2,A7A3,A7A4,A7A5,A7A6,A7A8,A7A9,A7AA,A7AB,A7AC,A7AD,A7AE,A7AF,A7B0,A7B1,A7B2,A7B3,A7B4,A7B5,A7B6,A7B7,A7B8,A7B9,A7BA,A7BB,A7BC,A7BD,A7BE,A7BF,A7C0,A7C1,A7D1,A7D2,A7D3,A7D4,A7D5,A7D6,A7D8,A7D9,A7DA,A7DB,A7DC,A7DD,A7DE,A7DF,A7E0,A7E1,A7E2,A7E3,A7E4,A7E5,A7E6,A7E7,A7E8,A7E9,A7EA,A7EB,A7EC,A7ED,A7EE,A7EF,A7F0,A7F1,A7D7,A1AA,A1AC,A1AE,A1AF,A1B0,A1B1,A1AD,A1EB,A1E4,A1E5,A1F9,A1E6,A1ED,A2F1,A2F2,A2F3,A2F4,A2F5,A2F6,A2F7,A2F8,A2F9,A2FA,A2FB,A2FC,A1FB,A1FC,A1FA,A1FD,A1CA,A1C7,A1C6,A1CC,A1D8,A1DE,A1CF,A1CE,A1C4,A1C5,A1C9,A1C8,A1D2,A1D3,A1E0,A1DF,A1C3,A1CB,A1D7,A1D6,A1D5,A1D9,A1D4,A1DC,A1DD,A1DA,A1DB,A1D1,A1CD,A1D0,A2D9,A2DA,A2DB,A2DC,A2DD,A2DE,A2DF,A2E0,A2E1,A2E2,A2C5,A2C6,A2C7,A2C8,A2C9,A2CA,A2CB,A2CC,A2CD,A2CE,A2CF,A2D0,A2D1,A2D2,A2D3,A2D4,A2D5,A2D6,A2D7,A2D8,A2B1,A2B2,A2B3,A2B4,A2B5,A2B6,A2B7,A2B8,A2B9,A2BA,A2BB,A2BC,A2BD,A2BE,A2BF,A2C0,A2C1,A2C2,A2C3,A2C4,A9A4,A9A5,A9A6,A9A7,A9A8,A9A9,A9AA,A9AB,A9AC,A9AD,A9AE,A9AF,A9B0,A9B1,A9B2,A9B3,A9B4,A9B5,A9B6,A9B7,A9B8,A9B9,A9BA,A9BB,A9BC,A9BD,A9BE,A9BF,A9C0,A9C1,A9C2,A9C3,A9C4,A9C5,A9C6,A9C7,A9C8,A9C9,A9CA,A9CB,A9CC,A9CD,A9CE,A9CF,A9D0,A9D1,A9D2,A9D3,A9D4,A9D5,A9D6,A9D7,A9D8,A9D9,A9DA,A9DB,A9DC,A9DD,A9DE,A9DF,A9E0,A9E1,A9E2,A9E3,A9E4,A9E5,A9E6,A9E7,A9E8,A9E9,A9EA,A9EB,A9EC,A9ED,A9EE,A9EF,A1F6,A1F5,A1F8,A1F7,A1F4,A1F3,A1F0,A1F2,A1F1,A1EF,A1EE,A1E2,A1E1,A1A1,A1A2,A1A3,A1A8,A1A9,A1B4,A1B5,A1B6,A1B7,A1B8,A1B9,A1BA,A1BB,A1BE,A1BF,A1FE,A1B2,A1B3,A1BC,A1BD,A4A1,A4A2,A4A3,A4A4,A4A5,A4A6,A4A7,A4A8,A4A9,A4AA,A4AB,A4AC,A4AD,A4AE,A4AF,A4B0,A4B1,A4B2,A4B3,A4B4,A4B5,A4B6,A4B7,A4B8,A4B9,A4BA,A4BB,A4BC,A4BD,A4BE,A4BF,A4C0,A4C1,A4C2,A4C3,A4C4,A4C5,A4C6,A4C7,A4C8,A4C9,A4CA,A4CB,A4CC,A4CD,A4CE,A4CF,A4D0,A4D1,A4D2,A4D3,A4D4,A4D5,A4D6,A4D7,A4D8,A4D9,A4DA,A4DB,A4DC,A4DD,A4DE,A4DF,A4E0,A4E1,A4E2,A4E3,A4E4,A4E5,A4E6,A4E7,A4E8,A4E9,A4EA,A4EB,A4EC,A4ED,A4EE,A4EF,A4F0,A4F1,A4F2,A4F3,A5A1,A5A2,A5A3,A5A4,A5A5,A5A6,A5A7,A5A8,A5A9,A5AA,A5AB,A5AC,A5AD,A5AE,A5AF,A5B0,A5B1,A5B2,A5B3,A5B4,A5B5,A5B6,A5B7,A5B8,A5B9,A5BA,A5BB,A5BC,A5BD,A5BE,A5BF,A5C0,A5C1,A5C2,A5C3,A5C4,A5C5,A5C6,A5C7,A5C8,A5C9,A5CA,A5CB,A5CC,A5CD,A5CE,A5CF,A5D0,A5D1,A5D2,A5D3,A5D4,A5D5,A5D6,A5D7,A5D8,A5D9,A5DA,A5DB,A5DC,A5DD,A5DE,A5DF,A5E0,A5E1,A5E2,A5E3,A5E4,A5E5,A5E6,A5E7,A5E8,A5E9,A5EA,A5EB,A5EC,A5ED,A5EE,A5EF,A5F0,A5F1,A5F2,A5F3,A5F4,A5F5,A5F6,A8C5,A8C6,A8C7,A8C8,A8C9,A8CA,A8CB,A8CC,A8CD,A8CE,A8CF,A8D0,A8D1,A8D2,A8D3,A8D4,A8D5,A8D6,A8D7,A8D8,A8D9,A8DA,A8DB,A8DC,A8DD,A8DE,A8DF,A8E0,A8E1,A8E2,A8E3,A8E4,A8E5,A8E6,A8E7,A8E8,A8E9,A2E5,A2E6,A2E7,A2E8,A2E9,A2EA,A2EB,A2EC,A2ED,A2EE,D2BB,B6A1,C6DF,CDF2,D5C9,C8FD,C9CF,CFC2,D8A2,B2BB,D3EB,D8A4,B3F3,D7A8,C7D2,D8A7,CAC0,C7F0,B1FB,D2B5,B4D4,B6AB,CBBF,D8A9,B6AA,C1BD,D1CF,C9A5,D8AD,B8F6,D1BE,E3DC,D6D0,B7E1,B4AE,C1D9,D8BC,CDE8,B5A4,CEAA,D6F7,C0F6,BED9,D8AF,C4CB,BEC3,D8B1,C3B4,D2E5,D6AE,CEDA,D5A7,BAF5,B7A6,C0D6,C6B9,C5D2,C7C7,B9D4,B3CB,D2D2,D8BF,BEC5,C6F2,D2B2,CFB0,CFE7,CAE9,D8C0,C2F2,C2D2,C8E9,C7AC,C1CB,D3E8,D5F9,CAC2,B6FE,D8A1,D3DA,BFF7,D4C6,BBA5,D8C1,CEE5,BEAE,D8A8,D1C7,D0A9,D8BD,D9EF,CDF6,BFBA,BDBB,BAA5,D2E0,B2FA,BAE0,C4B6,CFED,BEA9,CDA4,C1C1,C7D7,D9F1,D9F4,C8CB,D8E9,D2DA,CAB2,C8CA,D8EC,D8EA,D8C6,BDF6,C6CD,B3F0,D8EB,BDF1,BDE9,C8D4,B4D3,C2D8,B2D6,D7D0,CACB,CBFB,D5CC,B8B6,CFC9,D9DA,D8F0,C7AA,D8EE,B4FA,C1EE,D2D4,D8ED,D2C7,D8EF,C3C7,D1F6,D6D9,D8F2,D8F5,BCFE,BCDB,C8CE,B7DD,B7C2,C6F3,D8F8,D2C1,CEE9,BCBF,B7FC,B7A5,D0DD,D6DA,D3C5,BBEF,BBE1,D8F1,C9A1,CEB0,B4AB,D8F3,C9CB,D8F6,C2D7,D8F7,CEB1,D8F9,B2AE,B9C0,D9A3,B0E9,C1E6,C9EC,CBC5,CBC6,D9A4,B5E8,B5AB,CEBB,B5CD,D7A1,D7F4,D3D3,CCE5,BACE,D9A2,D9DC,D3E0,D8FD,B7F0,D7F7,D8FE,D8FA,D9A1,C4E3,D3B6,D8F4,D9DD,D8FB,C5E5,C0D0,D1F0,B0DB,BCD1,D9A6,D9A5,D9AC,D9AE,D9AB,CAB9,D9A9,D6B6,B3DE,D9A8,C0FD,CACC,D9AA,D9A7,D9B0,B6B1,B9A9,D2C0,CFC0,C2C2,BDC4,D5EC,B2E0,C7C8,BFEB,D9AD,D9AF,CEEA,BAEE,C7D6,B1E3,B4D9,B6ED,D9B4,BFA1,D9DE,C7CE,C0FE,D9B8,CBD7,B7FD,D9B5,D9B7,B1A3,D3E1,D9B9,D0C5,D9B6,D9B1,D9B2,C1A9,D9B3,BCF3,D0DE,B8A9,BEE3,D9BD,D9BA,B0B3,D9C2,D9C4,B1B6,D9BF,B5B9,BEF3,CCC8,BAF2,D2D0,D9C3,BDE8,B3AB,D9C5,BEEB,D9C6,D9BB,C4DF,D9BE,D9C1,D9C0,D5AE,D6B5,C7E3,D9C8,BCD9,D9CA,D9BC,D9CB,C6AB,D9C9,D7F6,CDA3,BDA1,D9CC,C5BC,CDB5,D9CD,D9C7,B3A5,BFFE,B8B5,C0FC,B0F8,B4F6,D9CE,D9CF,B4A2,D9D0,B4DF,B0C1,D9D1,C9B5,CFF1,D9D2,C1C5,D9D6,C9AE,D9D5,D9D4,D9D7,CBDB,BDA9,C6A7,D9D3,D9D8,D9D9,C8E5,C0DC,B6F9,D8A3,D4CA,D4AA,D0D6,B3E4,D5D7,CFC8,B9E2,BFCB,C3E2,B6D2,CDC3,D9EE,D9F0,B5B3,B6B5,BEA4,C8EB,C8AB,B0CB,B9AB,C1F9,D9E2,C0BC,B9B2,B9D8,D0CB,B1F8,C6E4,BEDF,B5E4,D7C8,D1F8,BCE6,CADE,BCBD,D9E6,D8E7,C4DA,B8D4,C8BD,B2E1,D4D9,C3B0,C3E1,DAA2,C8DF,D0B4,BEFC,C5A9,B9DA,DAA3,D4A9,DAA4,D9FB,B6AC,B7EB,B1F9,D9FC,B3E5,BEF6,BFF6,D2B1,C0E4,B6B3,D9FE,D9FD,BEBB,C6E0,D7BC,DAA1,C1B9,B5F2,C1E8,BCF5,B4D5,C1DD,C4FD,BCB8,B7B2,B7EF,D9EC,C6BE,BFAD,BBCB,B5CA,DBC9,D0D7,CDB9,B0BC,B3F6,BBF7,DBCA,BAAF,D4E4,B5B6,B5F3,D8D6,C8D0,B7D6,C7D0,D8D7,BFAF,DBBB,D8D8,D0CC,BBAE,EBBE,C1D0,C1F5,D4F2,B8D5,B4B4,B3F5,C9BE,C5D0,C5D9,C0FB,B1F0,D8D9,B9CE,B5BD,D8DA,D6C6,CBA2,C8AF,C9B2,B4CC,BFCC,B9F4,D8DB,D8DC,B6E7,BCC1,CCEA,CFF7,D8DD,C7B0,B9D0,BDA3,CCDE,C6CA,D8E0,D8DE,D8DF,B0FE,BEE7,CAA3,BCF4,B8B1,B8EE,D8E2,BDCB,D8E4,D8E3,C5FC,D8E5,D8E6,C1A6,C8B0,B0EC,B9A6,BCD3,CEF1,DBBD,C1D3,B6AF,D6FA,C5AC,BDD9,DBBE,DBBF,C0F8,BEA2,C0CD,DBC0,CAC6,B2AA,D3C2,C3E3,D1AB,DBC2,C0D5,DBC3,BFB1,C4BC,C7DA,DBC4,D9E8,C9D7,B9B4,CEF0,D4C8,B0FC,B4D2,D0D9,D9E9,DECB,D9EB,D8B0,BBAF,B1B1,B3D7,D8CE,D4D1,BDB3,BFEF,CFBB,D8D0,B7CB,D8D1,C6A5,C7F8,D2BD,D8D2,C4E4,CAAE,C7A7,D8A6,C9FD,CEE7,BBDC,B0EB,BBAA,D0AD,B1B0,D7E4,D7BF,B5A5,C2F4,C4CF,B2A9,B2B7,B1E5,DFB2,D5BC,BFA8,C2AC,D8D5,C2B1,D8D4,CED4,DAE0,CEC0,D8B4,C3AE,D3A1,CEA3,BCB4,C8B4,C2D1,BEED,D0B6,DAE1,C7E4,B3A7,B6F2,CCFC,C0FA,C0F7,D1B9,D1E1,D8C7,B2DE,C0E5,BAF1,D8C8,D4AD,CFE1,D8C9,D8CA,CFC3,B3F8,BEC7,D8CB,DBCC,C8A5,CFD8,C8FE,B2CE,D3D6,B2E6,BCB0,D3D1,CBAB,B7B4,B7A2,CAE5,C8A1,CADC,B1E4,D0F0,C5D1,DBC5,B5FE,BFDA,B9C5,BEE4,C1ED,DFB6,DFB5,D6BB,BDD0,D5D9,B0C8,B6A3,BFC9,CCA8,DFB3,CAB7,D3D2,D8CF,D2B6,BAC5,CBBE,CCBE,DFB7,B5F0,DFB4,D3F5,B3D4,B8F7,DFBA,BACF,BCAA,B5F5,CDAC,C3FB,BAF3,C0F4,CDC2,CFF2,DFB8,CFC5,C2C0,DFB9,C2F0,BEFD,C1DF,CDCC,D2F7,B7CD,DFC1,DFC4,B7F1,B0C9,B6D6,B7D4,BAAC,CCFD,BFD4,CBB1,C6F4,D6A8,DFC5,CEE2,B3B3,CEFC,B4B5,CEC7,BAF0,CEE1,D1BD,DFC0,B4F4,B3CA,B8E6,DFBB,C4C5,DFBC,DFBD,DFBE,C5BB,DFBF,DFC2,D4B1,DFC3,C7BA,CED8,C4D8,DFCA,DFCF,D6DC,DFC9,DFDA,CEB6,BAC7,DFCE,DFC8,C5DE,C9EB,BAF4,C3FC,BED7,DFC6,DFCD,C5D8,D5A6,BACD,BECC,D3BD,B8C0,D6E4,DFC7,B9BE,BFA7,C1FC,DFCB,DFCC,DFD0,DFDB,DFE5,DFD7,DFD6,D7C9,DFE3,DFE4,E5EB,D2A7,DFD2,BFA9,D4DB,BFC8,DFD4,CFCC,DFDD,D1CA,DFDE,B0A7,C6B7,DFD3,BAE5,B6DF,CDDB,B9FE,D4D5,DFDF,CFEC,B0A5,DFE7,DFD1,D1C6,DFD5,DFD8,DFD9,DFDC,BBA9,DFE0,DFE1,DFE2,DFE6,DFE8,D3B4,B8E7,C5B6,DFEA,C9DA,C1A8,C4C4,BFDE,CFF8,D5DC,DFEE,B2B8,BADF,DFEC,DBC1,D1E4,CBF4,B4BD,B0A6,DFF1,CCC6,DFF2,DFED,DFE9,DFEB,DFEF,DFF0,BBBD,DFF3,DFF4,BBA3,CADB,CEA8,E0A7,B3AA,E0A6,E0A1,DFFE,CDD9,DFFC,DFFA,BFD0,D7C4,C9CC,DFF8,B0A1,DFFD,DFFB,E0A2,E0A8,B7C8,C6A1,C9B6,C0B2,DFF5,C5BE,D8C4,DFF9,C4F6,E0A3,E0A4,E0A5,D0A5,E0B4,CCE4,E0B1,BFA6,E0AF,CEB9,E0AB,C9C6,C0AE,E0AE,BAED,BAB0,E0A9,DFF6,E0B3,E0B8,B4AD,E0B9,CFB2,BAC8,E0B0,D0FA,E0AC,D4FB,DFF7,C5E7,E0AD,D3F7,E0B6,E0B7,E0C4,D0E1,E0BC,E0C9,E0CA,E0BE,E0AA,C9A4,E0C1,E0B2,CAC8,E0C3,E0B5,CECB,CBC3,E0CD,E0C6,E0C2,E0CB,E0BA,E0BF,E0C0,E0C5,E0C7,E0C8,E0CC,E0BB,CBD4,E0D5,E0D6,E0D2,E0D0,BCCE,E0D1,B8C2,D8C5,D0EA,C2EF,E0CF,E0BD,E0D4,E0D3,E0D7,E0DC,E0D8,D6F6,B3B0,D7EC,CBBB,E0DA,CEFB,BAD9,E0E1,E0DD,D2AD,E0E2,E0DB,E0D9,E0DF,E0E0,E0DE,E0E4,C6F7,D8AC,D4EB,E0E6,CAC9,E0E5,B8C1,E0E7,E0E8,E0E9,E0E3,BABF,CCE7,E0EA,CFF9,E0EB,C8C2,BDC0,C4D2,E0EC,E0ED,C7F4,CBC4,E0EE,BBD8,D8B6,D2F2,E0EF,CDC5,B6DA,E0F1,D4B0,C0A7,B4D1,CEA7,E0F0,E0F2,B9CC,B9FA,CDBC,E0F3,C6D4,E0F4,D4B2,C8A6,E0F6,E0F5,E0F7,CDC1,CAA5,D4DA,DBD7,DBD9,DBD8,B9E7,DBDC,DBDD,B5D8,DBDA,DBDB,B3A1,DBDF,BBF8,D6B7,DBE0,BEF9,B7BB,DBD0,CCAE,BFB2,BBB5,D7F8,BFD3,BFE9,BCE1,CCB3,DBDE,B0D3,CEEB,B7D8,D7B9,C6C2,C0A4,CCB9,DBE7,DBE1,C6BA,DBE3,DBE8,C5F7,DBEA,DBE9,BFC0,DBE6,DBE5,B4B9,C0AC,C2A2,DBE2,DBE4,D0CD,DBED,C0DD,DBF2,B6E2,DBF3,DBD2,B9B8,D4AB,DBEC,BFD1,DBF0,DBD1,B5E6,DBEB,BFE5,DBEE,DBF1,DBF9,B9A1,B0A3,C2F1,B3C7,DBEF,DBF8,C6D2,DBF4,DBF5,DBF7,DBF6,DBFE,D3F2,B2BA,DBFD,DCA4,DBFB,DBFA,DBFC,C5E0,BBF9,DCA3,DCA5,CCC3,B6D1,DDC0,DCA1,DCA2,C7B5,B6E9,DCA7,DCA6,DCA9,B1A4,B5CC,BFB0,D1DF,B6C2,DCA8,CBFA,EBF3,CBDC,CBFE,CCC1,C8FB,DCAA,CCEE,DCAB,DBD3,DCAF,DCAC,BEB3,CAFB,DCAD,C9CA,C4B9,C7BD,DCAE,D4F6,D0E6,C4AB,B6D5,DBD4,B1DA,DBD5,DBD6,BABE,C8C0,CABF,C8C9,D7B3,C9F9,BFC7,BAF8,D2BC,E2BA,B4A6,B1B8,B8B4,CFC4,D9E7,CFA6,CDE2,D9ED,B6E0,D2B9,B9BB,E2B9,E2B7,B4F3,CCEC,CCAB,B7F2,D8B2,D1EB,BABB,CAA7,CDB7,D2C4,BFE4,BCD0,B6E1,DEC5,DEC6,DBBC,D1D9,C6E6,C4CE,B7EE,B7DC,BFFC,D7E0,C6F5,B1BC,DEC8,BDB1,CCD7,DECA,DEC9,B5EC,C9DD,B0C2,C5AE,C5AB,C4CC,BCE9,CBFD,BAC3,E5F9,C8E7,E5FA,CDFD,D7B1,B8BE,C2E8,C8D1,E5FB,B6CA,BCCB,D1FD,E6A1,C3EE,E6A4,E5FE,E6A5,CDD7,B7C1,E5FC,E5FD,E6A3,C4DD,E6A8,E6A7,C3C3,C6DE,E6AA,C4B7,E6A2,CABC,BDE3,B9C3,E6A6,D0D5,CEAF,E6A9,E6B0,D2A6,BDAA,E6AD,E6AF,C0D1,D2CC,BCA7,E6B1,D2F6,D7CB,CDFE,CDDE,C2A6,E6AB,E6AC,BDBF,E6AE,E6B3,E6B2,E6B6,E6B8,C4EF,C4C8,BEEA,C9EF,E6B7,B6F0,C3E4,D3E9,E6B4,E6B5,C8A2,E6BD,E6B9,C6C5,CDF1,E6BB,E6BC,BBE9,E6BE,E6BA,C0B7,D3A4,E6BF,C9F4,E6C3,E6C4,D0F6,C3BD,C3C4,E6C2,E6C1,E6C7,CFB1,EBF4,E6CA,E6C5,BCDE,C9A9,BCB5,CFD3,E6C8,E6C9,E6CE,E6D0,E6D1,E6CB,B5D5,E6CC,E6CF,C4DB,E6C6,E6CD,E6D2,E6D4,E6D3,E6D5,D9F8,E6D6,E6D7,D7D3,E6DD,E6DE,BFD7,D4D0,D7D6,B4E6,CBEF,E6DA,D8C3,D7CE,D0A2,C3CF,E6DF,BCBE,B9C2,E6DB,D1A7,BAA2,C2CF,D8AB,CAEB,E5EE,E6DC,B7F5,C8E6,C4F5,E5B2,C4FE,CBFC,E5B3,D5AC,D3EE,CAD8,B0B2,CBCE,CDEA,BAEA,E5B5,E5B4,D7DA,B9D9,D6E6,B6A8,CDF0,D2CB,B1A6,CAB5,B3E8,C9F3,BFCD,D0FB,CAD2,E5B6,BBC2,CFDC,B9AC,D4D7,BAA6,D1E7,CFFC,BCD2,E5B7,C8DD,BFED,B1F6,CBDE,BCC5,BCC4,D2FA,C3DC,BFDC,B8BB,C3C2,BAAE,D4A2,C7DE,C4AF,B2EC,B9D1,E5BB,C1C8,D5AF,E5BC,E5BE,B4E7,B6D4,CBC2,D1B0,B5BC,CAD9,B7E2,C9E4,BDAB,CEBE,D7F0,D0A1,C9D9,B6FB,E6D8,BCE2,B3BE,C9D0,E6D9,B3A2,DECC,D3C8,DECD,D2A2,DECE,BECD,DECF,CAAC,D2FC,B3DF,E5EA,C4E1,BEA1,CEB2,C4F2,BED6,C6A8,B2E3,BED3,C7FC,CCEB,BDEC,CEDD,CABA,C6C1,E5EC,D0BC,D5B9,E5ED,CAF4,CDC0,C2C5,E5EF,C2C4,E5F0,E5F8,CDCD,C9BD,D2D9,E1A8,D3EC,CBEA,C6F1,E1AC,E1A7,E1A9,E1AA,E1AF,B2ED,E1AB,B8DA,E1AD,E1AE,E1B0,B5BA,E1B1,E1B3,E1B8,D1D2,E1B6,E1B5,C1EB,E1B7,D4C0,E1B2,E1BA,B0B6,E1B4,BFF9,E1B9,E1BB,E1BE,E1BC,D6C5,CFBF,E1BD,E1BF,C2CD,B6EB,D3F8,C7CD,B7E5,BEFE,E1C0,E1C1,E1C7,B3E7,C6E9,B4DE,D1C2,E1C8,E1C6,E1C5,E1C3,E1C2,B1C0,D5B8,E1C4,E1CB,E1CC,E1CA,EFFA,E1D3,E1D2,C7B6,E1C9,E1CE,E1D0,E1D4,E1D1,E1CD,E1CF,E1D5,E1D6,E1D7,E1D8,E1DA,E1DB,CEA1,E7DD,B4A8,D6DD,D1B2,B3B2,B9A4,D7F3,C7C9,BEDE,B9AE,CED7,B2EE,DBCF,BCBA,D2D1,CBC8,B0CD,CFEF,D9E3,BDED,B1D2,CAD0,B2BC,CBA7,B7AB,CAA6,CFA3,E0F8,D5CA,E0FB,E0FA,C5C1,CCFB,C1B1,E0F9,D6E3,B2AF,D6C4,B5DB,B4F8,D6A1,CFAF,B0EF,E0FC,E1A1,B3A3,E0FD,E0FE,C3B1,C3DD,E1A2,B7F9,BBCF,E1A3,C4BB,E1A4,E1A5,E1A6,B4B1,B8C9,C6BD,C4EA,B2A2,D0D2,E7DB,BBC3,D3D7,D3C4,B9E3,E2CF,D7AF,C7EC,B1D3,B4B2,E2D1,D0F2,C2AE,E2D0,BFE2,D3A6,B5D7,E2D2,B5EA,C3ED,B8FD,B8AE,C5D3,B7CF,E2D4,E2D3,B6C8,D7F9,CDA5,E2D8,E2D6,CAFC,BFB5,D3B9,E2D5,E2D7,C1AE,C0C8,E2DB,E2DA,C0AA,C1CE,E2DC,E2DD,E2DE,DBC8,D1D3,CDA2,BDA8,DEC3,D8A5,BFAA,DBCD,D2EC,C6FA,C5AA,DEC4,B1D7,DFAE,CABD,DFB1,B9AD,D2FD,B8A5,BAEB,B3DA,B5DC,D5C5,C3D6,CFD2,BBA1,E5F3,E5F2,E5F4,CDE4,C8F5,B5AF,C7BF,E5F6,ECB0,E5E6,B9E9,B5B1,C2BC,E5E8,E5E7,E5E9,D2CD,E1EA,D0CE,CDAE,D1E5,B2CA,B1EB,B1F2,C5ED,D5C3,D3B0,E1DC,E1DD,D2DB,B3B9,B1CB,CDF9,D5F7,E1DE,BEB6,B4FD,E1DF,BADC,E1E0,BBB2,C2C9,E1E1,D0EC,CDBD,E1E2,B5C3,C5C7,E1E3,E1E4,D3F9,E1E5,D1AD,E1E6,CEA2,E1E7,B5C2,E1E8,BBD5,D0C4,E2E0,B1D8,D2E4,E2E1,BCC9,C8CC,E2E3,ECFE,ECFD,DFAF,E2E2,D6BE,CDFC,C3A6,E3C3,D6D2,E2E7,E2E8,D3C7,E2EC,BFEC,E2ED,E2E5,B3C0,C4EE,E2EE,D0C3,BAF6,E2E9,B7DE,BBB3,CCAC,CBCB,E2E4,E2E6,E2EA,E2EB,E2F7,E2F4,D4F5,E2F3,C5AD,D5FA,C5C2,B2C0,E2EF,E2F2,C1AF,CBBC,B5A1,E2F9,BCB1,E2F1,D0D4,D4B9,E2F5,B9D6,E2F6,C7D3,E2F0,D7DC,EDA1,E2F8,EDA5,E2FE,CAD1,C1B5,BBD0,BFD6,BAE3,CBA1,EDA6,EDA3,EDA2,BBD6,EDA7,D0F4,EDA4,BADE,B6F7,E3A1,B6B2,CCF1,B9A7,CFA2,C7A1,BFD2,B6F1,E2FA,E2FB,E2FD,E2FC,C4D5,E3A2,D3C1,E3A7,C7C4,CFA4,E3A9,BAB7,E3A8,BBDA,E3A3,E3A4,E3AA,E3A6,CEF2,D3C6,BBBC,D4C3,C4FA,EDA8,D0FC,E3A5,C3F5,E3AD,B1AF,E3B2,BCC2,E3AC,B5BF,C7E9,E3B0,BEAA,CDEF,BBF3,CCE8,E3AF,E3B1,CFA7,E3AE,CEA9,BBDD,B5EB,BEE5,B2D2,B3CD,B1B9,E3AB,B2D1,B5AC,B9DF,B6E8,CFEB,E3B7,BBCC,C8C7,D0CA,E3B8,B3EE,EDA9,D3FA,D3E4,EDAA,E3B9,D2E2,E3B5,D3DE,B8D0,E3B3,E3B6,B7DF,E3B4,C0A2,E3BA,D4B8,B4C8,E3BB,BBC5,C9F7,C9E5,C4BD,EDAB,C2FD,BBDB,BFAE,CEBF,E3BC,BFB6,B1EF,D4F7,E3BE,EDAD,E3BF,BAA9,EDAC,E3BD,E3C0,BAB6,B6AE,D0B8,B0C3,EDAE,EDAF,C0C1,E3C1,C5B3,E3C2,DCB2,EDB0,B8EA,CEEC,EAA7,D0E7,CAF9,C8D6,CFB7,B3C9,CED2,BDE4,E3DE,BBF2,EAA8,D5BD,C6DD,EAA9,EAAA,EAAC,EAAB,EAAE,EAAD,BDD8,EAAF,C2BE,B4C1,B4F7,BBA7,ECE6,ECE5,B7BF,CBF9,B1E2,ECE7,C9C8,ECE8,ECE9,CAD6,DED0,B2C5,D4FA,C6CB,B0C7,B4F2,C8D3,CDD0,BFB8,BFDB,C7A4,D6B4,C0A9,DED1,C9A8,D1EF,C5A4,B0E7,B3B6,C8C5,B0E2,B7F6,C5FA,B6F3,D5D2,B3D0,BCBC,B3AD,BEF1,B0D1,D2D6,CAE3,D7A5,CDB6,B6B6,BFB9,D5DB,B8A7,C5D7,DED2,BFD9,C2D5,C7C0,BBA4,B1A8,C5EA,C5FB,CCA7,B1A7,B5D6,C4A8,DED3,D1BA,B3E9,C3F2,B7F7,D6F4,B5A3,B2F0,C4B4,C4E9,C0AD,DED4,B0E8,C5C4,C1E0,B9D5,BEDC,CDD8,B0CE,CDCF,DED6,BED0,D7BE,DED5,D5D0,B0DD,C4E2,C2A3,BCF0,D3B5,C0B9,C5A1,B2A6,D4F1,C0A8,CAC3,DED7,D5FC,B9B0,C8AD,CBA9,DED9,BFBD,C6B4,D7A7,CAB0,C4C3,B3D6,B9D2,D6B8,EAFC,B0B4,BFE6,CCF4,CDDA,D6BF,C2CE,CECE,CCA2,D0AE,C4D3,B5B2,DED8,D5F5,BCB7,BBD3,B0A4,C5B2,B4EC,D5F1,EAFD,DEDA,CDA6,CDEC,CEE6,DEDC,CDB1,C0A6,D7BD,DEDB,B0C6,BAB4,C9D3,C4F3,BEE8,B2B6,C0CC,CBF0,BCF1,BBBB,B5B7,C5F5,DEE6,DEE3,BEDD,DEDF,B4B7,BDDD,DEE0,C4ED,CFC6,B5E0,B6DE,CADA,B5F4,DEE5,D5C6,DEE1,CCCD,C6FE,C5C5,D2B4,BEF2,C2D3,CCBD,B3B8,BDD3,BFD8,CDC6,D1DA,B4EB,DEE4,DEDD,DEE7,EAFE,C2B0,DEE2,D6C0,B5A7,B2F4,DEE8,DEF2,DEED,DEF1,C8E0,D7E1,DEEF,C3E8,CCE1,B2E5,D2BE,DEEE,DEEB,CED5,B4A7,BFAB,BEBE,BDD2,DEE9,D4AE,DEDE,DEEA,C0BF,DEEC,B2F3,B8E9,C2A7,BDC1,DEF5,DEF8,B2AB,B4A4,B4EA,C9A6,DEF6,CBD1,B8E3,DEF7,DEFA,DEF9,CCC2,B0E1,B4EE,E5BA,D0AF,B2EB,EBA1,DEF4,C9E3,DEF3,B0DA,D2A1,B1F7,CCAF,DEF0,CBA4,D5AA,DEFB,B4DD,C4A6,DEFD,C3FE,C4A1,DFA1,C1CC,DEFC,BEEF,C6B2,B3C5,C8F6,CBBA,DEFE,DFA4,D7B2,B3B7,C1C3,C7CB,B2A5,B4E9,D7AB,C4EC,DFA2,DFA3,DFA5,BAB3,DFA6,C0DE,C9C3,B2D9,C7E6,DFA7,C7DC,DFA8,EBA2,CBD3,DFAA,DFA9,B2C1,C5CA,DFAB,D4DC,C8C1,DFAC,BEF0,DFAD,D6A7,EAB7,EBB6,CAD5,D8FC,B8C4,B9A5,B7C5,D5FE,B9CA,D0A7,F4CD,B5D0,C3F4,BEC8,EBB7,B0BD,BDCC,C1B2,B1D6,B3A8,B8D2,C9A2,B6D8,EBB8,BEB4,CAFD,C7C3,D5FB,B7F3,CEC4,D5AB,B1F3,ECB3,B0DF,ECB5,B6B7,C1CF,F5FA,D0B1,D5E5,CED3,BDEF,B3E2,B8AB,D5B6,EDBD,B6CF,CBB9,D0C2,B7BD,ECB6,CAA9,C5D4,ECB9,ECB8,C2C3,ECB7,D0FD,ECBA,ECBB,D7E5,ECBC,ECBD,C6EC,CEDE,BCC8,C8D5,B5A9,BEC9,D6BC,D4E7,D1AE,D0F1,EAB8,EAB9,EABA,BAB5,CAB1,BFF5,CDFA,EAC0,B0BA,EABE,C0A5,EABB,B2FD,C3F7,BBE8,D2D7,CEF4,EABF,EABC,EAC3,D0C7,D3B3,B4BA,C3C1,D7F2,D5D1,CAC7,EAC5,EAC4,EAC7,EAC6,D6E7,CFD4,EACB,BBCE,BDFA,C9CE,EACC,C9B9,CFFE,EACA,D4CE,EACD,EACF,CDED,EAC9,EACE,CEEE,BBDE,B3BF,C6D5,BEB0,CEFA,C7E7,BEA7,EAD0,D6C7,C1C0,D4DD,EAD1,CFBE,EAD2,CAEE,C5AF,B0B5,EAD4,EAD3,F4DF,C4BA,B1A9,E5DF,EAD5,CAEF,EAD6,EAD7,C6D8,EAD8,EAD9,D4BB,C7FA,D2B7,B8FC,EAC2,B2DC,C2FC,D4F8,CCE6,D7EE,D4C2,D3D0,EBC3,C5F3,B7FE,EBD4,CBB7,EBDE,C0CA,CDFB,B3AF,C6DA,EBFC,C4BE,CEB4,C4A9,B1BE,D4FD,CAF5,D6EC,C6D3,B6E4,BBFA,D0E0,C9B1,D4D3,C8A8,B8CB,E8BE,C9BC,E8BB,C0EE,D0D3,B2C4,B4E5,E8BC,D5C8,B6C5,E8BD,CAF8,B8DC,CCF5,C0B4,D1EE,E8BF,E8C2,BABC,B1AD,BDDC,EABD,E8C3,E8C6,E8CB,E8CC,CBC9,B0E5,BCAB,B9B9,E8C1,CDF7,E8CA,CEF6,D5ED,C1D6,E8C4,C3B6,B9FB,D6A6,E8C8,CAE0,D4E6,E8C0,E8C5,E8C7,C7B9,B7E3,E8C9,BFDD,E8D2,E8D7,E8D5,BCDC,BCCF,E8DB,E8DE,E8DA,B1FA,B0D8,C4B3,B8CC,C6E2,C8BE,C8E1,E8CF,E8D4,E8D6,B9F1,E8D8,D7F5,C4FB,E8DC,B2E9,E8D1,BCED,BFC2,E8CD,D6F9,C1F8,B2F1,E8DF,CAC1,E8D9,D5A4,B1EA,D5BB,E8CE,E8D0,B6B0,E8D3,E8DD,C0B8,CAF7,CBA8,C6DC,C0F5,E8E9,D0A3,E8F2,D6EA,E8E0,E8E1,D1F9,BACB,B8F9,B8F1,D4D4,E8EF,E8EE,E8EC,B9F0,CCD2,E8E6,CEA6,BFF2,B0B8,E8F1,E8F0,D7C0,E8E4,CDA9,C9A3,BBB8,BDDB,E8EA,E8E2,E8E3,E8E5,B5B5,E8E7,C7C5,E8EB,E8ED,BDB0,D7AE,E8F8,E8F5,CDB0,E8F6,C1BA,E8E8,C3B7,B0F0,E8F4,E8F7,B9A3,C9D2,C3CE,CEE0,C0E6,CBF3,CCDD,D0B5,CAE1,E8F3,BCEC,E8F9,C3DE,C6E5,B9F7,B0F4,D7D8,BCAC,C5EF,CCC4,E9A6,C9AD,E9A2,C0E2,BFC3,E8FE,B9D7,E8FB,E9A4,D2CE,E9A3,D6B2,D7B5,E9A7,BDB7,E8FC,E8FD,E9A1,CDD6,D2AC,E9B2,E9A9,B4AA,B4BB,E9AB,D0A8,E9A5,B3FE,E9AC,C0E3,E9AA,E9B9,E9B8,E9AE,E8FA,E9A8,BFAC,E9B1,E9BA,C2A5,E9AF,B8C5,E9AD,D3DC,E9B4,E9B5,E9B7,E9C7,C0C6,E9C5,E9B0,E9BB,B0F1,E9BC,D5A5,E9BE,E9BF,E9C1,C1F1,C8B6,E9BD,E9C2,E9C3,E9B3,E9B6,BBB1,E9C0,BCF7,E9C4,E9C6,E9CA,E9CE,B2DB,E9C8,B7AE,E9CB,E9CC,D5C1,C4A3,E9D8,BAE1,E9C9,D3A3,E9D4,E9D7,E9D0,E9CF,C7C1,E9D2,E9D9,B3C8,E9D3,CFF0,E9CD,B3F7,E9D6,E9DA,CCB4,CFAD,E9D5,E9DC,E9DB,E9DE,E9D1,E9DD,E9DF,C3CA,C7B7,B4CE,BBB6,D0C0,ECA3,C5B7,D3FB,ECA4,ECA5,C6DB,BFEE,ECA6,ECA7,D0AA,C7B8,B8E8,ECA8,D6B9,D5FD,B4CB,B2BD,CEE4,C6E7,CDE1,B4F5,CBC0,BCDF,E9E2,E9E3,D1EA,E9E5,B4F9,E9E4,D1B3,CAE2,B2D0,E9E8,E9E6,E9E7,D6B3,E9E9,E9EA,E9EB,E9EC,ECAF,C5B9,B6CE,D2F3,B5EE,BBD9,ECB1,D2E3,CEE3,C4B8,C3BF,B6BE,D8B9,B1C8,B1CF,B1D1,C5FE,B1D0,C3AB,D5B1,EBA4,BAC1,CCBA,EBA5,EBA7,EBA8,EBA6,EBA9,EBAB,EBAA,EBAC,CACF,D8B5,C3F1,C3A5,C6F8,EBAD,C4CA,EBAE,EBAF,EBB0,B7D5,B7FA,EBB1,C7E2,EBB3,BAA4,D1F5,B0B1,EBB2,EBB4,B5AA,C2C8,C7E8,EBB5,CBAE,E3DF,D3C0,D9DB,CDA1,D6AD,C7F3,D9E0,BBE3,BABA,E3E2,CFAB,E3E0,C9C7,BAB9,D1B4,E3E1,C8EA,B9AF,BDAD,B3D8,CEDB,CCC0,E3E8,E3E9,CDF4,CCAD,BCB3,E3EA,E3EB,D0DA,C6FB,B7DA,C7DF,D2CA,CED6,E3E4,E3EC,C9F2,B3C1,E3E7,C6E3,E3E5,EDB3,E3E6,C9B3,C5E6,B9B5,C3BB,E3E3,C5BD,C1A4,C2D9,B2D7,E3ED,BBA6,C4AD,E3F0,BEDA,E3FB,E3F5,BAD3,B7D0,D3CD,D6CE,D5D3,B9C1,D5B4,D1D8,D0B9,C7F6,C8AA,B2B4,C3DA,E3EE,E3FC,E3EF,B7A8,E3F7,E3F4,B7BA,C5A2,E3F6,C5DD,B2A8,C6FC,C4E0,D7A2,C0E1,E3F9,E3FA,E3FD,CCA9,E3F3,D3BE,B1C3,EDB4,E3F1,E3F2,E3F8,D0BA,C6C3,D4F3,E3FE,BDE0,E4A7,E4A6,D1F3,E4A3,E4A9,C8F7,CFB4,E4A8,E4AE,C2E5,B6B4,BDF2,E4A2,BAE9,E4AA,E4AC,B6FD,D6DE,E4B2,E4AD,E4A1,BBEE,CDDD,C7A2,C5C9,C1F7,E4A4,C7B3,BDAC,BDBD,E4A5,D7C7,B2E2,E4AB,BCC3,E4AF,BBEB,E4B0,C5A8,E4B1,D5E3,BFA3,E4BA,E4B7,E4BB,E4BD,C6D6,BAC6,C0CB,B8A1,E4B4,D4A1,BAA3,BDFE,E4BC,CDBF,C4F9,CFFB,C9E6,D3BF,CFD1,E4B3,E4B8,E4B9,CCE9,CCCE,C0D4,E4B5,C1B0,E4B6,CED0,BBC1,B5D3,C8F3,BDA7,D5C7,C9AC,B8A2,E4CA,E4CC,D1C4,D2BA,BAAD,BAD4,E4C3,B5ED,D7CD,E4C0,CFFD,E4BF,C1DC,CCCA,CAE7,C4D7,CCD4,E4C8,E4C7,E4C1,E4C4,B5AD,D3D9,E4C6,D2F9,B4E3,BBB4,C9EE,B4BE,BBEC,D1CD,CCED,EDB5,C7E5,D4A8,E4CB,D7D5,E4C2,BDA5,E4C5,D3E6,E4C9,C9F8,E4BE,D3E5,C7FE,B6C9,D4FC,B2B3,E4D7,CEC2,E4CD,CEBC,B8DB,E4D6,BFCA,D3CE,C3EC,C5C8,E4D8,CDC4,E4CF,E4D4,E4D5,BAFE,CFE6,D5BF,E4D2,E4D0,E4CE,CDE5,CAAA,C0A3,BDA6,E4D3,B8C8,E4E7,D4B4,E4DB,C1EF,E4E9,D2E7,E4DF,E4E0,CFAA,CBDD,E4DA,E4D1,E4E5,C8DC,E4E3,C4E7,E4E2,E4E1,B3FC,E4E8,B5E1,D7CC,E4E6,BBAC,D7D2,CCCF,EBF8,E4E4,B9F6,D6CD,E4D9,E4DC,C2FA,E4DE,C2CB,C0C4,C2D0,B1F5,CCB2,B5CE,E4EF,C6AF,C6E1,E4F5,C2A9,C0EC,D1DD,E4EE,C4AE,E4ED,E4F6,E4F4,C2FE,E4DD,E4F0,CAFE,D5C4,E4F1,D1FA,E4EB,E4EC,E4F2,CEAB,C5CB,C7B1,C2BA,E4EA,C1CA,CCB6,B3B1,E4FB,E4F3,E4FA,E4FD,E4FC,B3CE,B3BA,E4F7,E4F9,E4F8,C5EC,C0BD,D4E8,E5A2,B0C4,E5A4,E5A3,BCA4,E5A5,E5A1,E4FE,B1F4,E5A8,E5A9,E5A6,E5A7,E5AA,C6D9,E5AB,E5AD,E5AC,E5AF,E5AE,B9E0,E5B0,E5B1,BBF0,ECE1,C3F0,B5C6,BBD2,C1E9,D4EE,BEC4,D7C6,D4D6,B2D3,ECBE,EAC1,C2AF,B4B6,D1D7,B3B4,C8B2,BFBB,ECC0,D6CB,ECBF,ECC1,ECC5,BEE6,CCBF,C5DA,BEBC,ECC6,B1FE,ECC4,D5A8,B5E3,ECC2,C1B6,B3E3,ECC3,CBB8,C0C3,CCFE,C1D2,ECC8,BAE6,C0D3,D6F2,D1CC,BFBE,B7B3,C9D5,ECC7,BBE2,CCCC,BDFD,C8C8,CFA9,CDE9,C5EB,B7E9,D1C9,BAB8,ECC9,ECCA,BBC0,ECCB,ECE2,B1BA,B7D9,BDB9,ECCC,D1E6,ECCD,C8BB,ECD1,ECD3,BBCD,BCE5,ECCF,C9B7,C3BA,ECE3,D5D5,ECD0,D6F3,ECD2,ECCE,ECD4,ECD5,C9BF,CFA8,D0DC,D1AC,C8DB,ECD6,CEF5,CAEC,ECDA,ECD9,B0BE,ECD7,ECD8,ECE4,C8BC,C1C7,ECDC,D1E0,ECDB,D4EF,ECDD,DBC6,ECDE,B1AC,ECDF,ECE0,D7A6,C5C0,EBBC,B0AE,BEF4,B8B8,D2AF,B0D6,B5F9,D8B3,CBAC,E3DD,C6AC,B0E6,C5C6,EBB9,EBBA,EBBB,D1C0,C5A3,EAF2,C4B2,C4B5,C0CE,EAF3,C4C1,CEEF,EAF0,EAF4,C9FC,C7A3,CCD8,CEFE,EAF5,EAF6,CFAC,C0E7,EAF7,B6BF,EAF8,EAF9,EAFA,EAFB,EAF1,C8AE,E1EB,B7B8,E1EC,E1ED,D7B4,E1EE,E1EF,D3CC,E1F1,BFF1,E1F0,B5D2,B1B7,E1F3,E1F2,BAFC,E1F4,B9B7,BED1,C4FC,BADD,BDC6,E1F5,E1F7,B6C0,CFC1,CAA8,E1F6,D5F8,D3FC,E1F8,E1FC,E1F9,E1FA,C0EA,E1FE,E2A1,C0C7,E1FB,E1FD,E2A5,C1D4,E2A3,E2A8,B2FE,E2A2,C3CD,B2C2,E2A7,E2A6,E2A4,E2A9,E2AB,D0C9,D6ED,C3A8,E2AC,CFD7,E2AE,BAEF,E9E0,E2AD,E2AA,BBAB,D4B3,E2B0,E2AF,E9E1,E2B1,E2B2,E2B3,CCA1,E2B4,E2B5,D0FE,C2CA,D3F1,CDF5,E7E0,E7E1,BEC1,C2EA,E7E4,E7E3,CDE6,C3B5,E7E2,BBB7,CFD6,C1E1,E7E9,E7E8,E7F4,B2A3,E7EA,E7E6,E7EC,E7EB,C9BA,D5E4,E7E5,B7A9,E7E7,E7EE,E7F3,D6E9,E7ED,E7F2,E7F1,B0E0,E7F5,C7F2,C0C5,C0ED,C1F0,E7F0,E7F6,CBF6,E8A2,E8A1,D7C1,E7FA,E7F9,E7FB,E7F7,E7FE,E7FD,E7FC,C1D5,C7D9,C5FD,C5C3,C7ED,E8A3,E8A6,E8A5,E8A7,BAF7,E7F8,E8A4,C8F0,C9AA,E8A9,B9E5,D1FE,E8A8,E8AA,E8AD,E8AE,C1A7,E8AF,E8B0,E8AC,E8B4,E8AB,E8B1,E8B5,E8B2,E8B3,E8B7,E8B6,B9CF,F0AC,F0AD,C6B0,B0EA,C8BF,CDDF,CECD,EAB1,EAB2,C6BF,B4C9,EAB3,D5E7,DDF9,EAB4,EAB5,EAB6,B8CA,DFB0,C9F5,CCF0,C9FA,C9FB,D3C3,CBA6,B8A6,F0AE,B1C2,E5B8,CCEF,D3C9,BCD7,C9EA,B5E7,C4D0,B5E9,EEAE,BBAD,E7DE,EEAF,B3A9,EEB2,EEB1,BDE7,EEB0,CEB7,C5CF,C1F4,DBCE,EEB3,D0F3,C2D4,C6E8,B7AC,EEB4,B3EB,BBFB,EEB5,E7DC,EEB6,BDAE,F1E2,CAE8,D2C9,F0DA,F0DB,F0DC,C1C6,B8ED,BECE,F0DE,C5B1,F0DD,D1F1,F0E0,B0CC,BDEA,D2DF,F0DF,B4AF,B7E8,F0E6,F0E5,C6A3,F0E1,F0E2,B4C3,F0E3,D5EE,CCDB,BED2,BCB2,F0E8,F0E7,F0E4,B2A1,D6A2,D3B8,BEB7,C8AC,F0EA,D1F7,D6CC,BADB,F0E9,B6BB,CDB4,C6A6,C1A1,F0EB,F0EE,F0ED,F0F0,F0EC,BBBE,F0EF,CCB5,F0F2,B3D5,B1D4,F0F3,F0F4,F0F6,B4E1,F0F1,F0F7,F0FA,F0F8,F0F5,F0FD,F0F9,F0FC,F0FE,F1A1,CEC1,F1A4,F1A3,C1F6,F0FB,CADD,B4F1,B1F1,CCB1,F1A6,F1A7,F1AC,D5CE,F1A9,C8B3,F1A2,F1AB,F1A8,F1A5,F1AA,B0A9,F1AD,F1AF,F1B1,F1B0,F1AE,D1A2,F1B2,F1B3,B9EF,B5C7,B0D7,B0D9,D4ED,B5C4,BDD4,BBCA,F0A7,B8DE,F0A8,B0A8,F0A9,CDEE,F0AA,F0AB,C6A4,D6E5,F1E4,F1E5,C3F3,D3DB,D6D1,C5E8,D3AF,D2E6,EEC1,B0BB,D5B5,D1CE,BCE0,BAD0,BFF8,B8C7,B5C1,C5CC,CAA2,C3CB,EEC2,C4BF,B6A2,EDEC,C3A4,D6B1,CFE0,EDEF,C5CE,B6DC,CAA1,EDED,EDF0,EDF1,C3BC,BFB4,EDEE,EDF4,EDF2,D5E6,C3DF,EDF3,EDF6,D5A3,D1A3,EDF5,C3D0,EDF7,BFF4,BEEC,EDF8,CCF7,D1DB,D7C5,D5F6,EDFC,EDFB,EDF9,EDFA,EDFD,BEA6,CBAF,EEA1,B6BD,EEA2,C4C0,EDFE,BDDE,B2C7,B6C3,EEA5,D8BA,EEA3,EEA6,C3E9,B3F2,EEA7,EEA4,CFB9,EEA8,C2F7,EEA9,EEAA,DEAB,C6B3,C7C6,D6F5,B5C9,CBB2,EEAB,CDAB,EEAC,D5B0,EEAD,F6C4,DBC7,B4A3,C3AC,F1E6,CAB8,D2D3,D6AA,EFF2,BED8,BDC3,EFF3,B6CC,B0AB,CAAF,EDB6,EDB7,CEF9,B7AF,BFF3,EDB8,C2EB,C9B0,EDB9,C6F6,BFB3,EDBC,C5F8,D1D0,D7A9,EDBA,EDBB,D1E2,EDBF,EDC0,EDC4,EDC8,EDC6,EDCE,D5E8,EDC9,EDC7,EDBE,C5E9,C6C6,C9E9,D4D2,EDC1,EDC2,EDC3,EDC5,C0F9,B4A1,B9E8,EDD0,EDD1,EDCA,EDCF,CEF8,CBB6,EDCC,EDCD,CFF5,EDD2,C1F2,D3B2,EDCB,C8B7,BCEF,C5F0,EDD6,B5EF,C2B5,B0AD,CBE9,B1AE,EDD4,CDEB,B5E2,EDD5,EDD3,EDD7,B5FA,EDD8,EDD9,EDDC,B1CC,C5F6,BCEE,EDDA,CCBC,B2EA,EDDB,C4EB,B4C5,B0F5,EDDF,C0DA,B4E8,C5CD,EDDD,BFC4,EDDE,C4A5,EDE0,EDE1,EDE3,C1D7,BBC7,BDB8,EDE2,EDE4,EDE6,EDE5,EDE7,CABE,ECEA,C0F1,C9E7,ECEB,C6EE,ECEC,C6ED,ECED,ECF0,D7E6,ECF3,ECF1,ECEE,ECEF,D7A3,C9F1,CBEE,ECF4,ECF2,CFE9,ECF6,C6B1,BCC0,ECF5,B5BB,BBF6,ECF7,D9F7,BDFB,C2BB,ECF8,ECF9,B8A3,ECFA,ECFB,ECFC,D3ED,D8AE,C0EB,C7DD,BACC,D0E3,CBBD,CDBA,B8D1,B1FC,C7EF,D6D6,BFC6,C3EB,EFF5,C3D8,D7E2,EFF7,B3D3,C7D8,D1ED,D6C8,EFF8,EFF6,BBFD,B3C6,BDD5,D2C6,BBE0,CFA1,EFFC,EFFB,EFF9,B3CC,C9D4,CBB0,EFFE,B0DE,D6C9,EFFD,B3ED,F6D5,CEC8,F0A2,F0A1,B5BE,BCDA,BBFC,B8E5,C4C2,F0A3,CBEB,F0A6,D1A8,BEBF,C7EE,F1B6,F1B7,BFD5,B4A9,F1B8,CDBB,C7D4,D5AD,F1B9,F1BA,C7CF,D2A4,D6CF,F1BB,BDD1,B4B0,BEBD,B4DC,CED1,BFDF,F1BD,BFFA,F1BC,F1BF,F1BE,F1C0,F1C1,C1FE,C1A2,CAFA,D5BE,BEBA,BEB9,D5C2,BFA2,CDAF,F1B5,BDDF,B6CB,D6F1,F3C3,F3C4,B8CD,F3C6,F3C7,B0CA,F3C5,F3C9,CBF1,F3CB,D0A6,B1CA,F3C8,F3CF,B5D1,F3D7,F3D2,F3D4,F3D3,B7FB,B1BF,F3CE,F3CA,B5DA,F3D0,F3D1,F3D5,F3CD,BCE3,C1FD,F3D6,F3DA,F3CC,B5C8,BDEE,F3DC,B7A4,BFF0,D6FE,CDB2,B4F0,B2DF,F3D8,F3D9,C9B8,F3DD,F3DE,F3E1,F3DF,F3E3,F3E2,F3DB,BFEA,B3EF,F3E0,C7A9,BCF2,F3EB,B9BF,F3E4,B2AD,BBFE,CBE3,F3ED,F3E9,B9DC,F3EE,F3E5,F3E6,F3EA,C2E1,F3EC,F3EF,F3E8,BCFD,CFE4,F3F0,F3E7,F3F2,D7AD,C6AA,F3F3,F3F1,C2A8,B8DD,F3F5,F3F4,B4DB,F3F6,F3F7,F3F8,C0BA,C0E9,C5F1,F3FB,F3FA,B4D8,F3FE,F3F9,F3FC,F3FD,F4A1,F4A3,BBC9,F4A2,F4A4,B2BE,F4A6,F4A5,BCAE,C3D7,D9E1,C0E0,F4CC,D7D1,B7DB,F4CE,C1A3,C6C9,B4D6,D5B3,F4D0,F4CF,F4D1,CBDA,F4D2,D4C1,D6E0,B7E0,C1B8,C1BB,F4D3,BEAC,B4E2,F4D4,F4D5,BEAB,F4D6,F4DB,F4D7,F4DA,BAFD,F4D8,F4D9,B8E2,CCC7,F4DC,B2DA,C3D3,D4E3,BFB7,F4DD,C5B4,F4E9,CFB5,CEC9,CBD8,CBF7,BDF4,D7CF,C0DB,D0F5,F4EA,F4EB,F4EC,F7E3,B7B1,F4ED,D7EB,F4EE,E6F9,BEC0,E6FA,BAEC,E6FB,CFCB,E6FC,D4BC,BCB6,E6FD,E6FE,BCCD,C8D2,CEB3,E7A1,B4BF,E7A2,C9B4,B8D9,C4C9,D7DD,C2DA,B7D7,D6BD,CEC6,B7C4,C5A6,E7A3,CFDF,E7A4,E7A5,E7A6,C1B7,D7E9,C9F0,CFB8,D6AF,D6D5,E7A7,B0ED,E7A8,E7A9,C9DC,D2EF,BEAD,E7AA,B0F3,C8DE,BDE1,E7AB,C8C6,E7AC,BBE6,B8F8,D1A4,E7AD,C2E7,BEF8,BDCA,CDB3,E7AE,E7AF,BEEE,D0E5,CBE7,CCD0,BCCC,E7B0,BCA8,D0F7,E7B1,D0F8,E7B2,E7B3,B4C2,E7B4,E7B5,C9FE,CEAC,C3E0,E7B7,B1C1,B3F1,E7B8,E7B9,D7DB,D5C0,E7BA,C2CC,D7BA,E7BB,E7BC,E7BD,BCEA,C3E5,C0C2,E7BE,E7BF,BCA9,E7C0,E7C1,E7B6,B6D0,E7C2,E7C3,E7C4,BBBA,B5DE,C2C6,B1E0,E7C5,D4B5,E7C6,B8BF,E7C8,E7C7,B7EC,E7C9,B2F8,E7CA,E7CB,E7CC,E7CD,E7CE,E7CF,E7D0,D3A7,CBF5,E7D1,E7D2,E7D3,E7D4,C9C9,E7D5,E7D6,E7D7,E7D8,E7D9,BDC9,E7DA,F3BE,B8D7,C8B1,F3BF,F3C0,F3C1,B9DE,CDF8,D8E8,BAB1,C2DE,EEB7,B7A3,EEB9,EEB8,B0D5,EEBB,D5D6,D7EF,D6C3,EEBD,CAF0,EEBC,EEBE,EEC0,EEBF,D1F2,C7BC,C3C0,B8E1,C1E7,F4C6,D0DF,F4C7,CFDB,C8BA,F4C8,F4C9,F4CA,F4CB,D9FA,B8FE,E5F1,D3F0,F4E0,CECC,B3E1,F1B4,D2EE,F4E1,CFE8,F4E2,C7CC,B5D4,B4E4,F4E4,F4E3,F4E5,F4E6,F4E7,BAB2,B0BF,F4E8,B7AD,D2ED,D2AB,C0CF,BFBC,EBA3,D5DF,EAC8,F1F3,B6F8,CBA3,C4CD,F1E7,F1E8,B8FB,F1E9,BAC4,D4C5,B0D2,F1EA,F1EB,F1EC,F1ED,F1EE,F1EF,F1F1,F1F0,C5D5,F1F2,B6FA,F1F4,D2AE,DEC7,CBCA,B3DC,B5A2,B9A2,C4F4,F1F5,F1F6,C1C4,C1FB,D6B0,F1F7,F1F8,C1AA,C6B8,BEDB,F1F9,B4CF,F1FA,EDB2,EDB1,CBE0,D2DE,CBC1,D5D8,C8E2,C0DF,BCA1,EBC1,D0A4,D6E2,B6C7,B8D8,EBC0,B8CE,EBBF,B3A6,B9C9,D6AB,B7F4,B7CA,BCE7,B7BE,EBC6,EBC7,B0B9,BFCF,EBC5,D3FD,EBC8,EBC9,B7CE,EBC2,EBC4,C9F6,D6D7,D5CD,D0B2,EBCF,CEB8,EBD0,B5A8,B1B3,EBD2,CCA5,C5D6,EBD3,EBD1,C5DF,EBCE,CAA4,EBD5,B0FB,BAFA,D8B7,F1E3,EBCA,EBCB,EBCC,EBCD,EBD6,E6C0,EBD9,BFE8,D2C8,EBD7,EBDC,B8EC,EBD8,BDBA,D0D8,B0B7,EBDD,C4DC,D6AC,B4E0,C2F6,BCB9,EBDA,EBDB,D4E0,C6EA,C4D4,EBDF,C5A7,D9F5,B2B1,EBE4,BDC5,EBE2,EBE3,B8AC,CDD1,EBE5,EBE1,C1B3,C6A2,CCF3,EBE6,C0B0,D2B8,EBE7,B8AF,B8AD,EBE8,C7BB,CDF3,EBEA,EBEB,EBED,D0C8,EBF2,EBEE,EBF1,C8F9,D1FC,EBEC,EBE9,B8B9,CFD9,C4E5,EBEF,EBF0,CCDA,CDC8,B0F2,EBF6,EBF5,B2B2,B8E0,EBF7,B1EC,CCC5,C4A4,CFA5,EBF9,ECA2,C5F2,EBFA,C9C5,E2DF,EBFE,CDCE,ECA1,B1DB,D3B7,D2DC,EBFD,EBFB,B3BC,EAB0,D7D4,F4AB,B3F4,D6C1,D6C2,D5E9,BECA,F4A7,D2A8,F4A8,F4A9,F4AA,BECB,D3DF,C9E0,C9E1,F3C2,CAE6,CCF2,E2B6,CBB4,CEE8,D6DB,F4AD,F4AE,F4AF,F4B2,BABD,F4B3,B0E3,F4B0,F4B1,BDA2,B2D5,F4B6,F4B7,B6E6,B2B0,CFCF,F4B4,B4AC,F4B5,F4B8,F4B9,CDA7,F4BA,F4BB,F4BC,CBD2,F4BD,F4BE,F4BF,F4DE,C1BC,BCE8,C9AB,D1DE,E5F5,DCB3,D2D5,DCB4,B0AC,DCB5,BDDA,DCB9,D8C2,DCB7,D3F3,C9D6,DCBA,DCB6,DCBB,C3A2,DCBC,DCC5,DCBD,CEDF,D6A5,DCCF,DCCD,DCD2,BDE6,C2AB,DCB8,DCCB,DCCE,DCBE,B7D2,B0C5,DCC7,D0BE,DCC1,BBA8,B7BC,DCCC,DCC6,DCBF,C7DB,D1BF,DCC0,DCCA,DCD0,CEAD,DCC2,DCC3,DCC8,DCC9,B2D4,DCD1,CBD5,D4B7,DCDB,DCDF,CCA6,DCE6,C3E7,DCDC,BFC1,DCD9,B0FA,B9B6,DCE5,DCD3,DCC4,DCD6,C8F4,BFE0,C9BB,B1BD,D3A2,DCDA,DCD5,C6BB,DCDE,D7C2,C3AF,B7B6,C7D1,C3A9,DCE2,DCD8,DCEB,DCD4,DCDD,BEA5,DCD7,DCE0,DCE3,DCE4,DCF8,DCE1,DDA2,DCE7,BCEB,B4C4,C3A3,B2E7,DCFA,DCF2,DCEF,DCFC,DCEE,D2F0,B2E8,C8D7,C8E3,DCFB,DCED,DCF7,DCF5,BEA3,DCF4,B2DD,DCF3,BCF6,DCE8,BBC4,C0F3,BCD4,DCE9,DCEA,DCF1,DCF6,DCF9,B5B4,C8D9,BBE7,DCFE,DCFD,D3AB,DDA1,DDA3,DDA5,D2F1,DDA4,DDA6,DDA7,D2A9,BAC9,DDA9,DDB6,DDB1,DDB4,DDB0,C6CE,C0F2,C9AF,DCEC,DDAE,DDB7,DCF0,DDAF,DDB8,DDAC,DDB9,DDB3,DDAD,C4AA,DDA8,C0B3,C1AB,DDAA,DDAB,DDB2,BBF1,DDB5,D3A8,DDBA,DDBB,C3A7,DDD2,DDBC,DDD1,B9BD,BED5,BEFA,BACA,DDCA,DDC5,DDBF,B2CB,DDC3,DDCB,B2A4,DDD5,DDBE,C6D0,DDD0,DDD4,C1E2,B7C6,DDCE,DDCF,DDC4,DDBD,DDCD,CCD1,DDC9,DDC2,C3C8,C6BC,CEAE,DDCC,DDC8,DDC1,DDC6,C2DC,D3A9,D3AA,DDD3,CFF4,C8F8,DDE6,DDC7,DDE0,C2E4,DDE1,DDD7,D6F8,DDD9,DDD8,B8F0,DDD6,C6CF,B6AD,DDE2,BAF9,D4E1,DDE7,B4D0,DDDA,BFFB,DDE3,DDDF,DDDD,B5D9,DDDB,DDDC,DDDE,BDAF,DDE4,DDE5,DDF5,C3C9,CBE2,DDF2,D8E1,C6D1,DDF4,D5F4,DDF3,DDF0,DDEC,DDEF,DDE8,D0EE,C8D8,DDEE,DDE9,DDEA,CBF2,DDED,B1CD,C0B6,BCBB,DDF1,DDF7,DDF6,DDEB,C5EE,DDFB,DEA4,DEA3,DDF8,C3EF,C2FB,D5E1,CEB5,DDFD,B2CC,C4E8,CADF,C7BE,DDFA,DDFC,DDFE,DEA2,B0AA,B1CE,DEAC,DEA6,BDB6,C8EF,DEA1,DEA5,DEA9,DEA8,DEA7,DEAD,D4CC,DEB3,DEAA,DEAE,C0D9,B1A1,DEB6,DEB1,DEB2,D1A6,DEB5,DEAF,DEB0,D0BD,DEB4,CAED,DEB9,DEB8,DEB7,DEBB,BDE5,B2D8,C3EA,DEBA,C5BA,DEBC,CCD9,B7AA,D4E5,DEBD,DEBF,C4A2,DEC1,DEBE,DEC0,D5BA,DEC2,F2AE,BBA2,C2B2,C5B0,C2C7,F2AF,D0E9,D3DD,EBBD,B3E6,F2B0,F2B1,CAAD,BAE7,F2B3,F2B5,F2B4,CBE4,CFBA,F2B2,CAB4,D2CF,C2EC,CEC3,F2B8,B0F6,F2B7,F2BE,B2CF,D1C1,F2BA,F2BC,D4E9,F2BB,F2B6,F2BF,F2BD,F2B9,F2C7,F2C4,F2C6,F2CA,F2C2,F2C0,F2C5,D6FB,F2C1,C7F9,C9DF,F2C8,B9C6,B5B0,F2C3,F2C9,F2D0,F2D6,BBD7,F2D5,CDDC,D6EB,F2D2,F2D4,B8F2,F2CB,F2CE,C2F9,D5DD,F2CC,F2CD,F2CF,F2D3,F2D9,D3BC,B6EA,CAF1,B7E4,F2D7,F2D8,F2DA,F2DD,F2DB,F2DC,D1D1,F2D1,CDC9,CECF,D6A9,F2E3,C3DB,F2E0,C0AF,F2EC,F2DE,F2E1,F2E8,F2E2,F2E7,F2E6,F2E9,F2DF,F2E4,F2EA,D3AC,F2E5,B2F5,F2F2,D0AB,F2F5,BBC8,F2F9,F2F0,F2F6,F2F8,F2FA,F2F3,F2F1,BAFB,B5FB,F2EF,F2F7,F2ED,F2EE,F2EB,F3A6,F3A3,F3A2,F2F4,C8DA,F2FB,F3A5,C3F8,F2FD,F3A7,F3A9,F3A4,F2FC,F3AB,F3AA,C2DD,F3AE,F3B0,F3A1,F3B1,F3AC,F3AF,F2FE,F3AD,F3B2,F3B4,F3A8,F3B3,F3B5,D0B7,F3B8,D9F9,F3B9,F3B7,C8E4,F3B6,F3BA,F3BB,B4C0,EEC3,F3BC,F3BD,D1AA,F4AC,D0C6,D0D0,D1DC,CFCE,BDD6,D1C3,BAE2,E1E9,D2C2,F1C2,B2B9,B1ED,F1C3,C9C0,B3C4,D9F2,CBA5,F1C4,D6D4,F1C5,F4C0,F1C6,D4AC,F1C7,B0C0,F4C1,F4C2,B4FC,C5DB,CCBB,D0E4,CDE0,F1C8,D9F3,B1BB,CFAE,B8A4,F1CA,F1CB,B2C3,C1D1,D7B0,F1C9,F1CC,F1CE,D9F6,D2E1,D4A3,F4C3,C8B9,F4C4,F1CD,F1CF,BFE3,F1D0,F1D4,F1D6,F1D1,C9D1,C5E1,C2E3,B9FC,F1D3,F1D5,B9D3,F1DB,BAD6,B0FD,F1D9,F1D8,F1D2,F1DA,F1D7,C8EC,CDCA,F1DD,E5BD,F1DC,F1DE,F1DF,CFE5,F4C5,BDF3,F1E0,F1E1,CEF7,D2AA,F1FB,B8B2,BCFB,B9DB,B9E6,C3D9,CAD3,EAE8,C0C0,BEF5,EAE9,EAEA,EAEB,EAEC,EAED,EAEE,EAEF,BDC7,F5FB,F5FD,F5FE,F5FC,BDE2,F6A1,B4A5,F6A2,F6A3,ECB2,D1D4,D9EA,F6A4,EEBA,D5B2,D3FE,CCDC,CAC4,E5C0,F6A5,BEAF,C6A9,DAA5,BCC6,B6A9,B8BC,C8CF,BCA5,DAA6,DAA7,CCD6,C8C3,DAA8,C6FD,D1B5,D2E9,D1B6,BCC7,BDB2,BBE4,DAA9,DAAA,D1C8,DAAB,D0ED,B6EF,C2DB,CBCF,B7ED,C9E8,B7C3,BEF7,D6A4,DAAC,DAAD,C6C0,D7E7,CAB6,D5A9,CBDF,D5EF,DAAE,D6DF,B4CA,DAB0,DAAF,D2EB,DAB1,DAB2,DAB3,CAD4,DAB4,CAAB,DAB5,DAB6,B3CF,D6EF,DAB7,BBB0,B5AE,DAB8,DAB9,B9EE,D1AF,D2E8,DABA,B8C3,CFEA,B2EF,DABB,DABC,BDEB,CEDC,D3EF,DABD,CEF3,DABE,D3D5,BBE5,DABF,CBB5,CBD0,DAC0,C7EB,D6EE,DAC1,C5B5,B6C1,DAC2,B7CC,BFCE,DAC3,DAC4,CBAD,DAC5,B5F7,DAC6,C1C2,D7BB,DAC7,CCB8,D2EA,C4B1,DAC8,B5FD,BBD1,DAC9,D0B3,DACA,DACB,CEBD,DACC,DACD,DACE,B2F7,DAD1,DACF,D1E8,DAD0,C3D5,DAD2,DAD3,DAD4,DAD5,D0BB,D2A5,B0F9,DAD6,C7AB,DAD7,BDF7,C3A1,DAD8,DAD9,C3FD,CCB7,DADA,DADB,C0BE,C6D7,DADC,DADD,C7B4,DADE,DADF,B9C8,BBED,B6B9,F4F8,F4F9,CDE3,F5B9,EBE0,CFF3,BBBF,BAC0,D4A5,E1D9,F5F4,B1AA,B2F2,F5F5,F5F7,BAD1,F5F6,C3B2,F5F9,F5F8,B1B4,D5EA,B8BA,B9B1,B2C6,D4F0,CFCD,B0DC,D5CB,BBF5,D6CA,B7B7,CCB0,C6B6,B1E1,B9BA,D6FC,B9E1,B7A1,BCFA,EADA,EADB,CCF9,B9F3,EADC,B4FB,C3B3,B7D1,BAD8,EADD,D4F4,EADE,BCD6,BBDF,EADF,C1DE,C2B8,D4DF,D7CA,EAE0,EAE1,EAE4,EAE2,EAE3,C9DE,B8B3,B6C4,EAE5,CAEA,C9CD,B4CD,E2D9,C5E2,EAE6,C0B5,D7B8,EAE7,D7AC,C8FC,D8D3,D8CD,D4DE,D4F9,C9C4,D3AE,B8D3,B3E0,C9E2,F4F6,BAD5,F4F7,D7DF,F4F1,B8B0,D5D4,B8CF,C6F0,B3C3,F4F2,B3AC,D4BD,C7F7,F4F4,F4F3,CCCB,C8A4,F4F5,D7E3,C5BF,F5C0,F5BB,F5C3,F5C2,D6BA,F5C1,D4BE,F5C4,F5CC,B0CF,B5F8,F5C9,F5CA,C5DC,F5C5,F5C6,F5C7,F5CB,BEE0,F5C8,B8FA,F5D0,F5D3,BFE7,B9F2,F5BC,F5CD,C2B7,CCF8,BCF9,F5CE,F5CF,F5D1,B6E5,F5D2,F5D5,F5BD,F5D4,D3BB,B3EC,CCA4,F5D6,F5D7,BEE1,F5D8,CCDF,F5DB,B2C8,D7D9,F5D9,F5DA,F5DC,F5E2,F5E0,F5DF,F5DD,F5E1,F5DE,F5E4,F5E5,CCE3,E5BF,B5B8,F5E3,F5E8,CCA3,F5E6,F5E7,F5BE,B1C4,F5BF,B5C5,B2E4,F5EC,F5E9,B6D7,F5ED,F5EA,F5EB,B4DA,D4EA,F5EE,B3F9,F5EF,F5F1,F5F0,F5F2,F5F3,C9ED,B9AA,C7FB,B6E3,CCC9,EAA6,B3B5,D4FE,B9EC,D0F9,E9ED,D7AA,E9EE,C2D6,C8ED,BAE4,E9EF,E9F0,E9F1,D6E1,E9F2,E9F3,E9F5,E9F4,E9F6,E9F7,C7E1,E9F8,D4D8,E9F9,BDCE,E9FA,E9FB,BDCF,E9FC,B8A8,C1BE,E9FD,B1B2,BBD4,B9F5,E9FE,EAA1,EAA2,EAA3,B7F8,BCAD,CAE4,E0CE,D4AF,CFBD,D5B7,EAA4,D5DE,EAA5,D0C1,B9BC,B4C7,B1D9,C0B1,B1E6,B1E7,B1E8,B3BD,C8E8,E5C1,B1DF,C1C9,B4EF,C7A8,D3D8,C6F9,D1B8,B9FD,C2F5,D3AD,D4CB,BDFC,E5C2,B7B5,E5C3,BBB9,D5E2,BDF8,D4B6,CEA5,C1AC,B3D9,CCF6,E5C6,E5C4,E5C8,E5CA,E5C7,B5CF,C6C8,B5FC,E5C5,CAF6,E5C9,C3D4,B1C5,BCA3,D7B7,CDCB,CBCD,CACA,CCD3,E5CC,E5CB,C4E6,D1A1,D1B7,E5CD,E5D0,CDB8,D6F0,E5CF,B5DD,CDBE,E5D1,B6BA,CDA8,B9E4,CAC5,B3D1,CBD9,D4EC,E5D2,B7EA,E5CE,E5D5,B4FE,E5D6,E5D3,E5D4,D2DD,C2DF,B1C6,D3E2,B6DD,CBEC,E5D7,D3F6,B1E9,B6F4,E5DA,E5D8,E5D9,B5C0,D2C5,E5DC,E5DE,E5DD,C7B2,D2A3,E5DB,D4E2,D5DA,E5E0,D7F1,E5E1,B1DC,D1FB,E5E2,E5E4,E5E3,E5E5,D2D8,B5CB,E7DF,DAF5,DAF8,DAF6,DAF7,DAFA,D0CF,C4C7,B0EE,D0B0,DAF9,D3CA,BAAA,DBA2,C7F1,DAFC,DAFB,C9DB,DAFD,DBA1,D7DE,DAFE,C1DA,DBA5,D3F4,DBA7,DBA4,DBA8,BDBC,C0C9,DBA3,DBA6,D6A3,DBA9,DBAD,DBAE,DBAC,BAC2,BFA4,DBAB,DBAA,D4C7,B2BF,DBAF,B9F9,DBB0,B3BB,B5A6,B6BC,DBB1,B6F5,DBB2,B1C9,DBB4,DBB3,DBB5,DBB7,DBB6,DBB8,DBB9,DBBA,D3CF,F4FA,C7F5,D7C3,C5E4,F4FC,F4FD,F4FB,BEC6,D0EF,B7D3,D4CD,CCAA,F5A2,F5A1,BAA8,F4FE,CBD6,F5A4,C0D2,B3EA,CDAA,F5A5,F5A3,BDB4,F5A8,F5A9,BDCD,C3B8,BFE1,CBE1,F5AA,F5A6,F5A7,C4F0,F5AC,B4BC,D7ED,B4D7,F5AB,F5AE,F5AD,F5AF,D0D1,C3D1,C8A9,F5B0,F5B1,F5B2,F5B3,F5B4,F5B5,F5B7,F5B6,F5B8,B2C9,D3D4,CACD,C0EF,D6D8,D2B0,C1BF,BDF0,B8AA,BCF8,F6C6,F6C7,F6C8,F6C9,F6CA,F6CC,F6CB,F7E9,F6CD,F6CE,EEC4,EEC5,EEC6,D5EB,B6A4,EEC8,EEC7,EEC9,EECA,C7A5,EECB,EECC,B7B0,B5F6,EECD,EECF,EECE,B8C6,EED0,EED1,EED2,B6DB,B3AE,D6D3,C4C6,B1B5,B8D6,EED3,EED4,D4BF,C7D5,BEFB,CED9,B9B3,EED6,EED5,EED8,EED7,C5A5,EED9,EEDA,C7AE,EEDB,C7AF,EEDC,B2A7,EEDD,EEDE,EEDF,EEE0,EEE1,D7EA,EEE2,EEE3,BCD8,EEE4,D3CB,CCFA,B2AC,C1E5,EEE5,C7A6,C3AD,EEE6,EEE7,EEE8,EEE9,EEEA,EEEB,EEEC,EEED,EEEE,EEEF,EEF0,EEF1,EEF2,EEF4,EEF3,EEF5,CDAD,C2C1,EEF6,EEF7,EEF8,D5A1,EEF9,CFB3,EEFA,EEFB,EEFC,EEFD,EFA1,EEFE,EFA2,B8F5,C3FA,EFA3,EFA4,BDC2,D2BF,B2F9,EFA5,EFA6,EFA7,D2F8,EFA8,D6FD,EFA9,C6CC,EFAA,EFAB,C1B4,EFAC,CFFA,CBF8,EFAE,EFAD,B3FA,B9F8,EFAF,EFB0,D0E2,EFB1,EFB2,B7E6,D0BF,EFB3,EFB4,EFB5,C8F1,CCE0,EFB6,EFB7,EFB8,EFB9,EFBA,D5E0,EFBB,B4ED,C3AA,EFBC,EFBD,EFBE,EFBF,CEFD,EFC0,C2E0,B4B8,D7B6,BDF5,CFC7,EFC3,EFC1,EFC2,EFC4,B6A7,BCFC,BEE2,C3CC,EFC5,EFC6,EFC7,EFCF,EFC8,EFC9,EFCA,C7C2,EFF1,B6CD,EFCB,EFCC,EFCD,B6C6,C3BE,EFCE,EFD0,EFD1,EFD2,D5F2,EFD3,C4F7,EFD4,C4F8,EFD5,EFD6,B8E4,B0F7,EFD7,EFD8,EFD9,EFDA,EFDB,EFDC,EFDD,EFDE,BEB5,EFE1,EFDF,EFE0,EFE2,EFE3,C1CD,EFE4,EFE5,EFE6,EFE7,EFE8,EFE9,EFEA,EFEB,EFEC,C0D8,EFED,C1AD,EFEE,EFEF,EFF0,CFE2,B3A4,C3C5,E3C5,C9C1,E3C6,B1D5,CECA,B4B3,C8F2,E3C7,CFD0,E3C8,BCE4,E3C9,E3CA,C3C6,D5A2,C4D6,B9EB,CEC5,E3CB,C3F6,E3CC,B7A7,B8F3,BAD2,E3CD,E3CE,D4C4,E3CF,E3D0,D1CB,E3D1,E3D2,E3D3,E3D4,D1D6,E3D5,B2FB,C0BB,E3D6,C0AB,E3D7,E3D8,E3D9,E3DA,E3DB,B8B7,DAE2,B6D3,DAE4,DAE3,DAE6,C8EE,DAE5,B7C0,D1F4,D2F5,D5F3,BDD7,D7E8,DAE8,DAE7,B0A2,CDD3,DAE9,B8BD,BCCA,C2BD,C2A4,B3C2,DAEA,C2AA,C4B0,BDB5,CFDE,DAEB,C9C2,B1DD,DAEC,B6B8,D4BA,B3FD,DAED,D4C9,CFD5,C5E3,DAEE,DAEF,DAF0,C1EA,CCD5,CFDD,D3E7,C2A1,DAF1,CBE5,DAF2,CBE6,D2FE,B8F4,DAF3,B0AF,CFB6,D5CF,CBED,DAF4,E3C4,C1A5,F6BF,F6C0,F6C1,C4D1,C8B8,D1E3,D0DB,D1C5,BCAF,B9CD,EFF4,B4C6,D3BA,F6C2,B3FB,F6C3,B5F1,F6C5,D3EA,F6A7,D1A9,F6A9,F6A8,C1E3,C0D7,B1A2,CEED,D0E8,F6AB,CFF6,F6AA,D5F0,F6AC,C3B9,BBF4,F6AE,F6AD,C4DE,C1D8,CBAA,CFBC,F6AF,F6B0,F6B1,C2B6,B0D4,C5F9,F6B2,C7E0,F6A6,BEB8,BEB2,B5E5,B7C7,BFBF,C3D2,C3E6,D8CC,B8EF,BDF9,D1A5,B0D0,F7B0,F7B1,D0AC,B0B0,F7B2,F7B3,F7B4,C7CA,BECF,F7B7,F7B6,B1DE,F7B5,F7B8,F7B9,CEA4,C8CD,BAAB,E8B8,E8B9,E8BA,BEC2,D2F4,D4CF,C9D8,D2B3,B6A5,C7EA,F1FC,CFEE,CBB3,D0EB,E7EF,CDE7,B9CB,B6D9,F1FD,B0E4,CBCC,F1FE,D4A4,C2AD,C1EC,C6C4,BEB1,F2A1,BCD5,F2A2,F2A3,F2A4,D2C3,C6B5,CDC7,F2A5,D3B1,BFC5,CCE2,F2A6,F2A7,D1D5,B6EE,F2A8,F2A9,B5DF,F2AA,F2AB,B2FC,F2AC,F2AD,C8A7,B7E7,ECA9,ECAA,ECAB,ECAC,C6AE,ECAD,ECAE,B7C9,CAB3,E2B8,F7CF,F7D0,B2CD,F7D1,F7D3,F7D2,E2BB,BCA2,E2BC,E2BD,E2BE,E2BF,E2C0,E2C1,B7B9,D2FB,BDA4,CACE,B1A5,CBC7,E2C2,B6FC,C8C4,E2C3,BDC8,B1FD,E2C4,B6F6,E2C5,C4D9,E2C6,CFDA,B9DD,E2C7,C0A1,E2C8,B2F6,E2C9,C1F3,E2CA,E2CB,C2F8,E2CC,E2CD,E2CE,CAD7,D8B8,D9E5,CFE3,F0A5,DCB0,C2ED,D4A6,CDD4,D1B1,B3DB,C7FD,B2B5,C2BF,E6E0,CABB,E6E1,E6E2,BED4,E6E3,D7A4,CDD5,E6E5,BCDD,E6E4,E6E6,E6E7,C2EE,BDBE,E6E8,C2E6,BAA7,E6E9,E6EA,B3D2,D1E9,BFA5,E6EB,C6EF,E6EC,E6ED,E6EE,C6AD,E6EF,C9A7,E6F0,E6F1,E6F2,E5B9,E6F3,E6F4,C2E2,E6F5,E6F6,D6E8,E6F7,E6F8,B9C7,F7BB,F7BA,F7BE,F7BC,BAA1,F7BF,F7C0,F7C2,F7C1,F7C4,F7C3,F7C5,F7C6,F7C7,CBE8,B8DF,F7D4,F7D5,F7D6,F7D8,F7DA,F7D7,F7DB,F7D9,D7D7,F7DC,F7DD,F7DE,F7DF,F7E0,DBCB,D8AA,E5F7,B9ED,BFFD,BBEA,F7C9,C6C7,F7C8,F7CA,F7CC,F7CB,F7CD,CEBA,F7CE,C4A7,D3E3,F6CF,C2B3,F6D0,F6D1,F6D2,F6D3,F6D4,F6D6,B1AB,F6D7,F6D8,F6D9,F6DA,F6DB,F6DC,F6DD,F6DE,CFCA,F6DF,F6E0,F6E1,F6E2,F6E3,F6E4,C0F0,F6E5,F6E6,F6E7,F6E8,F6E9,F6EA,F6EB,F6EC,F6ED,F6EE,F6EF,F6F0,F6F1,F6F2,F6F3,F6F4,BEA8,F6F5,F6F6,F6F7,F6F8,C8FA,F6F9,F6FA,F6FB,F6FC,F6FD,F6FE,F7A1,F7A2,F7A3,F7A4,F7A5,F7A6,F7A7,F7A8,B1EE,F7A9,F7AA,F7AB,F7AC,F7AD,C1DB,F7AE,F7AF,C4F1,F0AF,BCA6,F0B0,C3F9,C5B8,D1BB,F0B1,F0B2,F0B3,F0B4,F0B5,D1BC,D1EC,F0B7,F0B6,D4A7,CDD2,F0B8,F0BA,F0B9,F0BB,F0BC,B8EB,F0BD,BAE8,F0BE,F0BF,BEE9,F0C0,B6EC,F0C1,F0C2,F0C3,F0C4,C8B5,F0C5,F0C6,F0C7,C5F4,F0C8,F0C9,F0CA,F7BD,F0CB,F0CC,F0CD,F0CE,F0CF,BAD7,F0D0,F0D1,F0D2,F0D3,F0D4,F0D5,F0D6,F0D8,D3A5,F0D7,F0D9,F5BA,C2B9,F7E4,F7E5,F7E6,F7E7,F7E8,C2B4,F7EA,F7EB,C2F3,F4F0,F4EF,C2E9,F7E1,F7E2,BBC6,D9E4,CAF2,C0E8,F0A4,BADA,C7AD,C4AC,F7EC,F7ED,F7EE,F7F0,F7EF,F7F1,F7F4,F7F3,F7F2,F7F5,F7F6,EDE9,EDEA,EDEB,F6BC,F6BD,F6BE,B6A6,D8BE,B9C4,D8BB,DCB1,CAF3,F7F7,F7F8,F7F9,F7FB,F7FA,B1C7,F7FC,F7FD,F7FE,C6EB,ECB4,B3DD,F6B3,F6B4,C1E4,F6B5,F6B6,F6B7,F6B8,F6B9,F6BA,C8A3,F6BB,C1FA,B9A8,EDE8,B9EA,D9DF,A3A1,A3A2,A3A3,A1E7,A3A5,A3A6,A3A7,A3A8,A3A9,A3AA,A3AB,A3AC,A3AD,A3AE,A3AF,A3B0,A3B1,A3B2,A3B3,A3B4,A3B5,A3B6,A3B7,A3B8,A3B9,A3BA,A3BB,A3BC,A3BD,A3BE,A3BF,A3C0,A3C1,A3C2,A3C3,A3C4,A3C5,A3C6,A3C7,A3C8,A3C9,A3CA,A3CB,A3CC,A3CD,A3CE,A3CF,A3D0,A3D1,A3D2,A3D3,A3D4,A3D5,A3D6,A3D7,A3D8,A3D9,A3DA,A3DB,A3DC,A3DD,A3DE,A3DF,A3E0,A3E1,A3E2,A3E3,A3E4,A3E5,A3E6,A3E7,A3E8,A3E9,A3EA,A3EB,A3EC,A3ED,A3EE,A3EF,A3F0,A3F1,A3F2,A3F3,A3F4,A3F5,A3F6,A3F7,A3F8,A3F9,A3FA,A3FB,A3FC,A3FD,A1AB,A1E9,A1EA,A3FE,A3A4';  
        }  
        UnicodeToAnsi = function(chrCode) {  
            var chrHex=chrCode.toString(16);  
            chrHex="000"+chrHex.toUpperCase();  
            chrHex=chrHex.substr(chrHex.length-4);  
            var i=UnicodeChr().indexOf(chrHex);  
          
            if(i!=-1){  
                chrHex=AnsicodeChr().substr(i,4);  
            }  
            return parseInt(chrHex,16)  
        }  
        AnsiToUnicode = function(chrCode) {  
            var chrHex=chrCode.toString(16);  
            chrHex="000"+chrHex.toUpperCase();  
            chrHex=chrHex.substr(chrHex.length-4);  
            var i=AnsicodeChr().indexOf(chrHex);  
          
            if(i!=-1) {  
                chrHex=UnicodeChr().substr(i,4);  
            }  
            return parseInt(chrHex,16)  
        }  
        strUnicode2Ansi = function(asContents){  
            var len1=asContents.length;  
            var temp="";  
            for(var i=0;i<len1;i++) {  
                var varasc=asContents.charCodeAt(i);  
                if(varasc<0)  
                    varasc+=65536;  
                      
                if(varasc>127)  
                    varasc=UnicodeToAnsi(varasc);  
                      
                if(varasc>255){  
                    var varlow=varasc & 65280;  
                    varlow=varlow>>8;  
                    var varhigh=varasc & 255;  
                    temp+=String.fromCharCode(varlow)+String.fromCharCode(varhigh);  
                }  
                else{  
                    temp+=String.fromCharCode(varasc);  
                }  
            }  
            return temp;  
        }  
        strAnsi2Unicode = function(asContents) {  
            var len1=asContents.length;  
            var temp="";  
            var chrcode;  
            for(var i=0;i<len1;i++) {  
                var varasc=asContents.charCodeAt(i);  
              
                if(varasc>127){  
                    chrcode=AnsiToUnicode((varasc<<8)+asContents.charCodeAt(++i));  
                }  
                else{  
                    chrcode=varasc;  
                }  
              
                temp+=String.fromCharCode(chrcode);  
            }  
            return temp;  
        }  
        encode64 = function(input) {  
            var output = "";  
            var chr1, chr2, chr3 = "";  
            var enc1, enc2, enc3, enc4 = "";  
            var i = 0;  
            do {  
                chr1 = input.charCodeAt(i++);  
                chr2 = input.charCodeAt(i++);  
                chr3 = input.charCodeAt(i++);  
                enc1 = chr1 >> 2;  
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
                enc4 = chr3 & 63;  
                if (isNaN(chr2)) {  
                    enc3 = enc4 = 64;  
                } else if (isNaN(chr3)) {  
                    enc4 = 64;  
                }  
                output = output +  
                keyStr.charAt(enc1) +  
                keyStr.charAt(enc2) +  
                keyStr.charAt(enc3) +  
                keyStr.charAt(enc4);  
                chr1 = chr2 = chr3 = "";  
                enc1 = enc2 = enc3 = enc4 = "";  
            } while (i < input.length);  
            return output;  
        }   
        decode64 = function(input) {  
            var output = "";  
            var chr1, chr2, chr3 = "";  
            var enc1, enc2, enc3, enc4 = "";  
            var i = 0;  
         
            if(input.length%4!=0)  
            {  
                return "";  
            }  
            var base64test = /[^A-Za-z0-9/+///=]/g;  
            if (base64test.exec(input))  
            {  
                return "";  
            }  
            do {  
                enc1 = keyStr.indexOf(input.charAt(i++));  
                enc2 = keyStr.indexOf(input.charAt(i++));  
                enc3 = keyStr.indexOf(input.charAt(i++));  
                enc4 = keyStr.indexOf(input.charAt(i++));  
                chr1 = (enc1 << 2) | (enc2 >> 4);  
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
                chr3 = ((enc3 & 3) << 6) | enc4;  
                
                output = output + String.fromCharCode(chr1);  
                if (enc3 != 64) {  
                    output+=String.fromCharCode(chr2);  
                }  
                if (enc4 != 64) {  
                    output+=String.fromCharCode(chr3);  
                }  
                chr1 = chr2 = chr3 = "";  
                enc1 = enc2 = enc3 = enc4 = "";  
            } while (i < input.length);  
            return output;  
        }  
        
        if(opts.data == ""){
            return false;
        }else{
            if(opts.type == 0){
                if(opts.unicode == true){
                    return encode64(strUnicode2Ansi(opts.data));  
                }else{
                    return encode64(opts.data); 
                }
            }else{
                if(opts.unicode == true){
                    return strAnsi2Unicode(decode64(opts.data));  
                }else{
                    return decode64(opts.data);  
                }
            }
        }
    }
})(jQuery);

;(function($){
	$.formatCurrency = {};
	$.formatCurrency.regions = [];
	// default Region is en
	$.formatCurrency.regions[''] = {
		symbol: '',
		positiveFormat: '%s%n',
		negativeFormat: '(%s%n)',
		decimalSymbol: '.',
		digitGroupSymbol: ',',
		groupDigits: true
	};

	$.fn.formatCurrency = function(destination, settings) {

		if (arguments.length == 1 && typeof destination !== "string") {
			settings = destination;
			destination = false;
		}

		// initialize defaults
		var defaults = {
			name: "formatCurrency",
			colorize: false,
			region: '',
			global: true,
			roundToDecimalPlace: 2, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
			eventOnDecimalsEntered: false
		};
		// initialize default region
		defaults = $.extend(defaults, $.formatCurrency.regions['']);
		// override defaults with settings passed in
		settings = $.extend(defaults, settings);

		// check for region setting
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);

		return this.each(function() {
			$this = $(this);

			// get number
			var num = '0';
			num = $this[$this.is('input, select, textarea') ? 'val' : 'html']();

			//identify '(123)' as a negative number
			if (num.search('\\(') >= 0) {
				num = '-' + num;
			}

			if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
				return;
			}

			// if the number is valid use it, otherwise clean it
			if (isNaN(num)) {
				// clean number
				num = num.replace(settings.regex, '');
				
				if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
					return;
				}
				
				if (settings.decimalSymbol != '.') {
					num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
				}
				if (isNaN(num)) {
					num = '0';
				}
			}
			
			// evalutate number input
			var numParts = String(num).split('.');
			var isPositive = (num == Math.abs(num));
			var hasDecimals = (numParts.length > 1);
			var decimals = (hasDecimals ? numParts[1].toString() : '0');
			var originalDecimals = decimals;
			
			// format number
			num = Math.abs(numParts[0]);
			num = isNaN(num) ? 0 : num;
			if (settings.roundToDecimalPlace >= 0) {
				decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
				decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
				if (decimals.substring(0, 1) == '2') {
					num = Number(num) + 1;
				}
				decimals = decimals.substring(2); // remove "0."
			}
			num = String(num);

			if (settings.groupDigits) {
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
					num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
				}
			}

			if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
				num += settings.decimalSymbol + decimals;
			}

			// format symbol/negative
			var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
			var money = format.replace(/%s/g, settings.symbol);
			money = money.replace(/%n/g, num);

			// setup destination
			var $destination = $([]);
			if (!destination) {
				$destination = $this;
			} else {
				$destination = $(destination);
			}
			// set destination
			$destination[$destination.is('input, select, textarea') ? 'val' : 'html'](money);

			if (
				hasDecimals && 
				settings.eventOnDecimalsEntered && 
				originalDecimals.length > settings.roundToDecimalPlace
			) {
				$destination.trigger('decimalsEntered', originalDecimals);
			}

			// colorize
			if (settings.colorize) {
				$destination.css('color', isPositive ? 'black' : 'red');
			}
		});
	};

	// Remove all non numbers from text
	$.fn.toNumber = function(settings) {
		var defaults = $.extend({
			name: "toNumber",
			region: '',
			global: true
		}, $.formatCurrency.regions['']);

		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);

		return this.each(function() {
			var method = $(this).is('input, select, textarea') ? 'val' : 'html';
			$(this)[method]($(this)[method]().replace('(', '(-').replace(settings.regex, ''));
		});
	};

	// returns the value from the first element as a number
	$.fn.asNumber = function(settings) {
		var defaults = $.extend({
			name: "asNumber",
			region: '',
			parse: true,
			parseType: 'Float',
			global: true
		}, $.formatCurrency.regions['']);
		settings = jQuery.extend(defaults, settings);
		if (settings.region.length > 0) {
			settings = $.extend(settings, getRegionOrCulture(settings.region));
		}
		settings.regex = generateRegex(settings);
		settings.parseType = validateParseType(settings.parseType);

		var method = $(this).is('input, select, textarea') ? 'val' : 'html';
		var num = $(this)[method]();
		num = num ? num : "";
		num = num.replace('(', '(-');
		num = num.replace(settings.regex, '');
		if (!settings.parse) {
			return num;
		}

		if (num.length == 0) {
			num = '0';
		}

		if (settings.decimalSymbol != '.') {
			num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arthmetic
		}

		return window['parse' + settings.parseType](num);
	};

	function getRegionOrCulture(region) {
		var regionInfo = $.formatCurrency.regions[region];
		if (regionInfo) {
			return regionInfo;
		}
		else {
			if (/(\w+)-(\w+)/g.test(region)) {
				var culture = region.replace(/(\w+)-(\w+)/g, "$1");
				return $.formatCurrency.regions[culture];
			}
		}
		// fallback to extend(null) (i.e. nothing)
		return null;
	}

	function validateParseType(parseType) {
		switch (parseType.toLowerCase()) {
			case 'int':
				return 'Int';
			case 'float':
				return 'Float';
			default:
				throw 'invalid parseType';
		}
	}
	
	function generateRegex(settings) {
		if (settings.symbol === '') {
			return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
		}
		else {
			var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');		
			return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
		}	
	}

})(jQuery);