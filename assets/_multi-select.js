var trigger, triggerValue;
var popup;
var input;
var liveRegion;
var resultListItems, resultLabels, resultCheckboxes, checkedCheckboxLabels;
var selectedTagsWrapper;

window.addEventListener('DOMContentLoaded', function (e) {
  trigger = document.querySelector('button');
  triggerValue = trigger.querySelector('.value');
  popup = document.querySelector('.popup');
  input = popup.querySelector('input');
  liveRegion = popup.querySelector('.results-count');
  resultListItems = popup.querySelectorAll('.results li');
  resultLabels = popup.querySelectorAll('.results li label');
  resultCheckboxes = popup.querySelectorAll('.results li input');
  selectedTagsWrapper = document.querySelector('.selected-tags');

  /** Expand/collapse the popup when the trigger button is activated. */
  trigger.addEventListener('click', function (e) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;
    trigger.setAttribute('aria-expanded', !isExpanded);
  });

  /** Collapse the popup when Escape key is pressed. */
  trigger.addEventListener('keydown', function (e) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;

    if (e.key === 'Escape' && isExpanded) {
      trigger.setAttribute('aria-expanded', false);
    }
  });

  /** Show/hide individual results as the user types in the text field. */
  input.addEventListener('input', function (e) {
    var filteredResultListItems = Array.prototype.slice.call(resultListItems).filter(function (listItem) {
      return listItem.querySelector('label').innerText.toLowerCase().includes(e.target.value.toLowerCase());
    });

    // Hide all results at first.
    resultListItems.forEach(function (listItem) {
      listItem.style.display = 'none';
    });

    // Show only the results that match the filter.
    filteredResultListItems.forEach(function (listItem) {
      listItem.style.display = 'flex';
    });

    // Announce to screen reader users that new results are available, and remind them how to reach them.
    liveRegion.innerHTML = '';  // clear the previous content so that the next line will always cause a screen reader announcement, even if the number of results is the same.
    liveRegion.innerHTML = filteredResultListItems.length + ' results available. Use Tab to access.';

    // After the screen reader has had some time to announce the line above, empty out the live region so that its text can't be reached with a virtual cursor.
    setTimeout(function () {
      liveRegion.innerHTML = '';
    }, 100);
  });

  /** Collapse the popup and move focus back to the trigger when the Escape key is pressed. */
  popup.addEventListener('keydown', function (e) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;

    if (e.key === 'Escape' && isExpanded) {
      trigger.setAttribute('aria-expanded', false);
      trigger.focus();
    }
  });

  /** Handle activation of each checkbox. */
  resultCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function (e) {
      triggerValue.innerHTML = '';

      // Get an array of all the labels belonging to checked checkboxes.
      checkedCheckboxLabels = Array.prototype.slice.call(resultLabels).filter(function (label) {
        return label.parentElement.querySelector('input').checked;
      });

      // If one or more checkbox is checked, list out their label text values in the trigger button, separated by commas.
      if (checkedCheckboxLabels.length > 0) {
        checkedCheckboxLabels.forEach(function (label, index) {
          triggerValue.innerHTML += label.innerHTML;

          if (index < checkedCheckboxLabels.length - 1) {
            triggerValue.innerHTML += ', ';
          }
        });

        // If no checkboxes are checked, revert the trigger button text to the original placeholder text.
      } else {
        triggerValue.innerHTML = 'Choose at least one';
      }

      buildTags();
    });
  });

  /** Collapse the popup if the user clicks anywhere outside it. */
  document.addEventListener('click', function (e) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true' ? true : false;

    if (!popup.contains(e.target) && !trigger.contains(e.target) && trigger != e.target && isExpanded) {
      trigger.setAttribute('aria-expanded', false);
    }
  });
});

function buildTags(setFocusToFirstTag = false) {
  // Get rid of any previous tags
  selectedTagsWrapper.innerHTML = '';

  // Find the labels for each checked option
  checkedCheckboxLabels = Array.prototype.slice.call(resultLabels).filter(function (label) {
    return label.parentElement.querySelector('input').checked;
  });

  // Build up a list of "remove" buttons (tags) for each checked option
  if (checkedCheckboxLabels.length > 0) {
    var tagsList = document.createElement('ul');

    checkedCheckboxLabels.forEach(function (label) {
      var tagListItem = document.createElement('li');

      var removeButton = document.createElement('button');
      removeButton.classList.add('tag');
      removeButton.innerHTML = '<span class="text">' + label.innerHTML + '</span> ' +
        '<span class="fas fa-times" aria-hidden="true"></span>' +
        '<span class="sr-only">Unselect</span>';

      // Uncheck the respective option's checkbox in the popup, then rebuild the tag list
      removeButton.addEventListener('click', function (e) {
        label.parentElement.querySelector('input').checked = false;
        buildTags(true);
      });

      tagListItem.appendChild(removeButton);
      tagsList.appendChild(tagListItem);
    });

    selectedTagsWrapper.appendChild(tagsList);
  }

  // Set focus to the first tag, if requested. If there aren't any tags left, move focus to the trigger button instead.
  if (setFocusToFirstTag) {
    if (checkedCheckboxLabels.length > 0) {
      tagsList.querySelector('button').focus();
    } else {
      trigger.focus();
    }
  }
}
