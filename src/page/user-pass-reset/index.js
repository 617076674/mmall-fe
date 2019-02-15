'use strict';
require('./index.css')
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//page逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadStepUsername();
    },
    bindEvent: function(){
        var _this = this;
        //输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                //用户名存在
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                //用户名不存在
                formError.show('请输入用户名');
            }
        });
        //输入密码提示问题答案中的按钮点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                //密码提示问题答案存在
                //检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                //用户名不存在
                formError.show('请输入密码提示问题答案');
            }
        });
        //如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            //keyCode等于13表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //加载输入用户名的一步
    loadStepUsername: function(){
        $('.step-username').show();
    },
    //加载输入密码提示问题答案的一步
    loadStepQuestion: function(){
        //清除错误提示
        formError.hide();
        //做容器的切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    //加载输入password的一步
    loadStepPassword: function(){
        
    }
};

$(function(){
    page.init();
});