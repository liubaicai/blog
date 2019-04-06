---
layout:     post
title:      "部分工具的卸载方法"
date:       2018-01-10 05:51:15 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>卸载omf(oh-my-fish):</p><pre class="ql-syntax" spellcheck="false">omf destroy
</pre><p>卸载rvm:</p><pre class="ql-syntax" spellcheck="false">rvm implode
</pre><p>卸载nvm:</p><pre class="ql-syntax" spellcheck="false">rm -rf $NVM_DIR ~/.npm ~/.bower
</pre><p><br></p><p>fish shell 设置brew安装的node/ruby路径:</p><pre class="ql-syntax" spellcheck="false">echo 'set -g fish_user_paths "/usr/local/opt/ruby@2.3/bin" $fish_user_paths' &gt;&gt; ~/.config/fish/config.fish
echo 'set -g fish_user_paths "/usr/local/opt/node@8/bin" $fish_user_paths' &gt;&gt; ~/.config/fish/config.fish
</pre><p><br></p><p><br></p>