# Meeting Preparation Document

## Meeting Details

| | |
|---|---|
| **Client** | {{ meeting.client_name }} |
| **Date** | {{ meeting_date }} |
| **Meeting Type** | {{ meeting.meeting_type }} |
| **Attendees** | {% for attendee in meeting.attendees %}{{ attendee }}{% if not loop.last %}, {% endif %}{% endfor %} |

---

## Agenda

{% for item in meeting.agenda_items %}
{{ loop.index }}. {{ item }}
{% endfor %}

---

## Questions to Ask

{% for question in meeting.questions_to_ask %}
- [ ] {{ question }}
{% endfor %}

---

## Documents Needed

{% for doc in meeting.documents_needed %}
- [ ] {{ doc }}
{% endfor %}

---

## Pre-Meeting Notes

{{ meeting.notes }}

---

## Follow-Up Actions (from previous)

{% if meeting.follow_up_actions %}
{% for action in meeting.follow_up_actions %}
- [ ] {{ action }}
{% endfor %}
{% else %}
*No previous follow-up actions*
{% endif %}

---

## Meeting Notes

*(Complete during/after meeting)*

### Discussion Summary



### Decisions Made



### Action Items

| Action | Owner | Due Date |
|--------|-------|----------|
| | | |
| | | |

### Next Meeting

**Date:** _______________
