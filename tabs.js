(function() {
    'use strict';
    class TabSet {
        constructor(el) {
            this.handleClick = this.handleClick.bind(this);
            this.el = el;
            this.tabs = this.el.getElementsByClassName('tab');
            this.content = this.el.getElementsByClassName('tab-content-item');
            this.activeTab = false;
            this.activeTabContent = false;
            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs.item(i).addEventListener('click', this.handleClick);
            }
            var url_string = window.location.href; 
            var url = new URL(url_string);
            var get_tab = url.searchParams.get("tab");
            if (get_tab) {
              this.activateTab(get_tab);
            } else {
              this.activateTab(this.tabs.item(0).getAttribute('data-tab-related'));
            }
        }
        handleClick(e) {
            e.preventDefault();
            var id = e.target.getAttribute('data-tab-related');
            this.activateTab(id);
        }
        activateTab(id) {
            if (this.activeTab !== false) {
                this.activeTab.className = this.activeTab.className.replace(" active", "");
            }
            if (this.activeTabContent !== false) {
                this.activeTabContent.className = this.activeTabContent.className.replace(" active", "");
            }
            for (var i = 0; i < this.tabs.length; i++) {
                var thisId = this.tabs.item(i).getAttribute('data-tab-related');
                if (thisId === id) {
                    this.tabs.item(i).className = this.tabs.item(i).className += " active";
                    this.activeTab = this.tabs.item(i);
                    break;
                }
            }
            for (i = 0; i < this.content.length; i++) {
                var thisId = this.content.item(i).getAttribute('data-tab-related');
                if (thisId === id) {
                    this.content.item(i).className = this.content.item(i).className += " active";
                    this.activeTabContent = this.content.item(i);
                    break;
                }
            }
        }
    }
    const init = function() {
        var collection = document.getElementsByClassName('tab-set');
        for (var i = 0; i < collection.length; i++) {
            new TabSet(collection.item(i));
        }
    }
    window.addEventListener('load', init);
})();
