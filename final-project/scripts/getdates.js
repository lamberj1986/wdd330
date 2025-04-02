document.addEventListener('DOMContentLoaded', function() {
    class DateManager {
        lastModified;
        copyYear;

        constructor(){
            this.genCopyYear();
            this.genLastModified();
        }

        genCopyYear(){
            this.copyYear = new Date().getFullYear();
        }

        genLastModified(){
            this.lastModified = document.lastModified;
        }

        displayLastModified(){
            return this.lastModified.toString();
        }

        displayCopyYear(){
            return `${this.copyYear}`;
        }
    }

    function main(){
        const manager = new DateManager();
        const currentYear = document.getElementById('currentYear');
        const lastModified = document.getElementById('lastModified');

        currentYear.innerHTML = manager.displayCopyYear();
        lastModified.innerHTML = `Last modified: ${manager.displayLastModified()}`;
    }

    main();
});