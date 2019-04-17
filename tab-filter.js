(function() {
  'use strict';
  class TabSet {
    constructor(el) {
      this.handleClick = this.handleClick.bind(this);
      this.el = el;
      this.tabs = this.el.getElementsByClassName('tab');
      this.content = this.el.getElementsByClassName('tab-content-item');
      if (this.content.length == 1) {
        this.content[0].className = this.content[0].className += " active";
        return;
      }
      this.activeTab = false;
      this.activeTabContent = [];
      for (var i = 0; i < this.tabs.length; i ++) {
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
      if (e.target.tagName == 'a') {
        e.preventDefault();
      }
      var id = e.target.getAttribute('data-tab-related');
      if(id == null) {
        id = e.target.closest('.tab').getAttribute('data-tab-related');
      }
      this.activateTab(id);
    }
    activateTab(id) {
      if (this.activeTab !== false) {
        this.activeTab.className = this.activeTab.className.replace(" active", "");
      }
      if (this.activeTabContent.length !== 0) {
        for( var i = 0; i < this.activeTabContent.length; i ++) {
          this.activeTabContent[i].className = this.activeTabContent[i].className.replace(" active", "");
        }
        this.activeTabContent = [];
      }
      for (var i = 0; i < this.tabs.length; i ++) {
        var thisId = this.tabs.item(i).getAttribute('data-tab-related');
        if (thisId === id) {
          this.tabs.item(i).className = this.tabs.item(i).className += " active";
          this.activeTab = this.tabs.item(i);
          break;
        }
      }
      for (i = 0; i < this.content.length; i ++) {
        var thisId = this.content.item(i).getAttribute('data-tab-related').split(", ");
        if (thisId.includes(id)) {
          this.content.item(i).className = this.content.item(i).className += " active";
          this.activeTabContent.push(this.content.item(i));
        }
      }
    }
  }
  const init = function() {
    var collection = document.getElementsByClassName('tab-set-filter');
    for (var i = 0; i < collection.length; i ++) {
      new TabSet(collection.item(i));
    }
  }
  window.addEventListener('load', init);
})();
