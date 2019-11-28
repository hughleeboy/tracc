DROP DATABASE IF EXISTS TRACC;
CREATE DATABASE TRACC;
USE TRACC;

CREATE TABLE User(
	Username VARCHAR(200) PRIMARY KEY,
	Password VARCHAR(200),
	FName VARCHAR(100),
	LName VARCHAR(100)
);

CREATE TABLE Application(
	Username VARCHAR(100),
	AppId VARCHAR(100),
	Name VARCHAR(100),
	Position VARCHAR(200),
	PRIMARY KEY (Username, AppId),
	FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE
);

CREATE TABLE Prospect(
	Username VARCHAR(100),
	AppId VARCHAR(100) ,
	Link VARCHAR(300),
	FOREIGN KEY (Username, AppId) REFERENCES Application(Username, AppId) ON DELETE CASCADE
);

CREATE TABLE Pending(
	Username VARCHAR(100),
	AppId VARCHAR(100),
	AppDate DATE,
	PRIMARY KEY (Username, AppId),
	FOREIGN KEY (Username, AppId) REFERENCES Application(Username, AppId) ON DELETE CASCADE
);

CREATE TABLE Reject(
	Username VARCHAR(100),
	AppId VARCHAR(100),
	AppDate DATE,
	PRIMARY KEY (Username, AppId),
	FOREIGN KEY (Username, AppId) REFERENCES Application(Username, AppId) ON DELETE CASCADE
);

CREATE TABLE Accept(
	Username VARCHAR(100),
	AppId VARCHAR(100) ,
	AppDate DATE,
	PRIMARY KEY (Username, AppId),
	FOREIGN KEY (Username, AppId) REFERENCES Application(Username, AppId) ON DELETE CASCADE
);

