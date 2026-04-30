# Modified default Kramdown handling for footnotes but with added heading
# https://kramdown.gettalong.org/rdoc/Kramdown/Converter/Html.html#method-i-footnote_content

require 'kramdown'
require 'kramdown/converter/html'

class Kramdown::Converter::Html
    def footnote_content
        ol = Kramdown::Element.new(:ol)
        ol.attr['start'] = @footnote_start if @footnote_start != 1
        i = 0
        backlink_text = escape_html(@options[:footnote_backlink], :text)
        while i < @footnotes.length
            name, data, _, repeat = *@footnotes[i]
            li = Kramdown::Element.new(:li, nil, 'id' => "fn:#{name}")
            li.children = Marshal.load(Marshal.dump(data.children))

            para = nil
            if li.children.last.type == :p || @options[:footnote_backlink_inline]
                parent = li
                while !parent.children.empty? && ![:p, :header].include?(parent.children.last.type)
                    parent = parent.children.last
                end
                para = parent.children.last
                insert_space = true
            end

            unless para
                li.children << (para = Kramdown::Element.new(:p))
                insert_space = false
            end

            unless @options[:footnote_backlink].empty?
                nbsp = entity_to_str(ENTITY_NBSP)
                value = sprintf(FOOTNOTE_BACKLINK_FMT, (insert_space ? nbsp : ''), name, backlink_text)
                para.children << Kramdown::Element.new(:raw, value)
                (1..repeat).each do |index|
                    value = sprintf(FOOTNOTE_BACKLINK_FMT, nbsp, "#{name}:#{index}",
                                                    "#{backlink_text}<sup>#{index + 1}</sup>")
                    para.children << Kramdown::Element.new(:raw, value)
                end
            end

            ol.children << Kramdown::Element.new(:raw, convert(li, 4))
            i += 1
        end
        if ol.children.empty?
            ''
        else
            heading_html = '<h2 id="meta-references">References</h2>' # the auto ID generation for headings doesn't apply for this so added manually (and distinguished by custom prefix to avoid conflicts with existing user-added 'References' headings)
            content = convert(ol, 2)
            format_as_indented_block_html('div', {class: "footnotes", role: "doc-endnotes"}, heading_html + content, 0)
        end
    end
end