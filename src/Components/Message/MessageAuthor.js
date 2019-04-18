/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getUserFullName } from '../../Utils/User';
import { getChatTitle, isPrivateChat } from '../../Utils/Chat';
import UserStore from '../../Stores/UserStore';
import ChatStore from '../../Stores/ChatStore';
import './MessageAuthor.css';

class MessageAuthor extends React.Component {
    handleSelect = () => {
        const { chatId, userId, onSelectUser, onSelectChat } = this.props;

        if (onSelectUser) {
            onSelectUser(userId);
            return;
        }

        if (onSelectChat) {
            onSelectChat(chatId);
            return;
        }
    };

    render() {
        const { chatId, userId, onSelectUser, onSelectChat } = this.props;

        const user = UserStore.get(userId);
        if (user) {
            const tileColor = isPrivateChat(chatId)
                ? 'message-author-color'
                : `user_color_${(Math.abs(userId) % 8) + 1}`;
            const className = classNames([tileColor], 'message-author');

            const fullName = getUserFullName(user);

            return onSelectUser ? (
                <a className={className} onClick={this.handleSelect}>
                    {fullName}
                </a>
            ) : (
                <>{fullName}</>
            );
        }

        const chat = ChatStore.get(chatId);
        if (chat) {
            const className = classNames('message-author-color', 'message-author');

            const fullName = getChatTitle(chatId, false);

            return onSelectChat ? (
                <a className={className} onClick={this.handleSelect}>
                    {fullName}
                </a>
            ) : (
                <>{fullName}</>
            );
        }

        return null;
    }
}

MessageAuthor.propTypes = {
    chatId: PropTypes.number,
    userId: PropTypes.number,
    onSelectUser: PropTypes.func,
    onSelectChat: PropTypes.func
};

export default MessageAuthor;