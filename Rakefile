# Add 2016-03－01(rake post title="xx")
require 'ruby-pinyin'

desc "Create a post in _posts"
task :new do
    puts "Input Article Title(for Article)："
    @name = STDIN.gets.chomp
    puts "Input Article Tags(Separated By ,)"
    @tags = STDIN.gets.chomp

    @date = Time.now.strftime("%F")
    @post_url = (@dir=="") ? "" : ("/" + "#{@dir}");
    @post_name = "_posts#{@post_url}/#{@date}-#{PinYin.permlink(@name)}.md"
    if File.exist?(@post_name)
       abort("Failed to create the file name already exists !")
    end
    FileUtils.touch(@post_name)
    open(@post_name, 'a') do |file|
        file.puts "---"
        file.puts "layout: post"
        file.puts "title: #{@name}"
        file.puts "date: #{Time.now}"
        file.puts "tags:"
        @tags.split(',').each do |line|
            file.puts "     - #{line}"
        end
        file.puts "author: baicai"
        file.puts "catalog: true"
        file.puts "---"
    end
    exec "code #{@post_name}"
end