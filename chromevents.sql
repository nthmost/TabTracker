create table event_types (
   id integer auto_increment primary key not null,
   name varchar(255) unique default ""
);

create table events (
   id integer auto_increment primary key not null,
   typeid integer not null,
   tabid integer default null,
   windowid integer default null,
   timestamp datetime default 0,
   openertabid integer default null,
   url varchar(255) default ""
);

# TYPES
# NewTabFromLink
# CloseTab
# NewWindow
# NewTab
# ChangeActiveTab
# SetURL
# BackButton
# NewWindowFromLink 

