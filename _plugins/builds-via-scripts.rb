module BuildsViaScripts
    def self.process(site, payload)
        return if @processed

        scripts = ["./_scripts/build-search-indexes.ps1", "./_scripts/build-recent-changes.ps1"]

        scripts.each do |script|
            success = system "powershell -ep Bypass #{script}" # `powershell` rather than `pwsh` prefix to support older versions (eg: on W10)
            Jekyll.logger.warn("Warning: #{script} failed") unless success
        end

        @processed = true
    end
end

# Hook for whole site, after Liquid processing and files have been written/`_site` directories generated (`post_write`)
Jekyll::Hooks.register :site, :post_write do |site, payload|
    BuildsViaScripts.process(site, payload)
end