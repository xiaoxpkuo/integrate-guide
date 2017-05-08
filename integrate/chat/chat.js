function renderHistoryMessages(list, hasMsg, instance) {
    return new Vue({
        el: '#chatPage',
        data: {
            stat: {
                currentView: 'chat',
                currentUserInfo: {
                    "id": "user1",
                    "nickname": "产品",
                    "region": "86",
                    "phone": "13269772701",
                    "portraitUri": "//rongcloud-image.ronghub.com/51a5244dfaa94aeaec.jpg?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:PDdQkDGfSpprlI-GRlcCi9CWqUk="
                },
                targetUserInfo: {
                    "id": "user2",
                    "nickname": "开发",
                    "region": "86",
                    "phone": "13269772702",
                    "portraitUri": "//rongcloud-image.ronghub.com/0980f3474f9d4dac5f.jpg?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:TQHVqMbqImknpP8YI0OxDgFICto="
                },
                messageList: list,
                sendMsgVal: ''
            }
        },
        components: {
            chat: {
                props: ['stat'],
                template: '#chat',
                methods: {
                    sendMsg: function () {
                        var text = this.stat.sendMsgVal;
                        if (!text) {
                            return false;
                        }
                        var msg = new RongIMLib.TextMessage({content: text, extra: "附加信息"});
                        var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
                        var targetId = "user2"; // 目标 Id
                        var that = this;
                        instance.sendMessage(conversationType, targetId, msg, {
                                // 发送消息成功
                                onSuccess: function (message) {
                                    that.stat.sendMsgVal = '';
                                    that.stat.messageList.push(message);
                                    that.$nextTick(that.scrollEnd);
                                }
                            }
                        );
                    },
                    scrollEnd: function () {
                        //添加完消息 跳转到最后一条
                        var list = document.querySelectorAll('.message-item');
                        if (list.length > 1) {
                            var last = list[list.length - 1];
                            last.scrollIntoView();
                        }
                    }
                },
                mounted: function () {
                    this.scrollEnd();
                }
            }
        }
    });
}

