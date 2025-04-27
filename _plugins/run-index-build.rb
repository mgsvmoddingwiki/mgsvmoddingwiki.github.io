module BuildSearchIndexes
    def self.process(site, payload)
        return if @processed
        system "powershell build-search-indexes.ps1" # `powershell` rather than `pwsh` prefix to support older versions (eg: on W10)
        @processed = true
    end
end

# Hook for whole site, after Liquid processing and files have been written/`_site` directories generated (`post_write`)
Jekyll::Hooks.register :site, :post_write do |site, payload|
    BuildSearchIndexes.process(site, payload)
end