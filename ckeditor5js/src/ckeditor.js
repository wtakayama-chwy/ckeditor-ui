/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments.js';
import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting.js';
import RealTimeCollaborativeRevisionHistory from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativerevisionhistory.js';
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Comments from '@ckeditor/ckeditor5-comments/src/comments.js';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges.js';
import RevisionHistory from '@ckeditor/ckeditor5-revision-history/src/revisionhistory.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Bold,
	CloudServices,
	Essentials,
	Heading,
	Image,
	ImageToolbar,
	ImageUpload,
	Italic,
	Link,
	List,
	Paragraph,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeRevisionHistory,
	RealTimeCollaborativeTrackChanges,
	SpecialCharacters,
	SpecialCharactersEssentials,
	Table,
	TodoList,
	Comments,
	TrackChanges,
	RevisionHistory
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'imageUpload',
			'insertTable',
			'undo',
			'redo'
		]
	},
	language: 'en',
	image: {
		toolbar: [
			'imageTextAlternative',
			'comment',
			'comment'
		]
	},
	comments: {
		editorConfig: {
			extraPlugins: [
				Bold,
				Italic,
				List
			]
		}
	}
};

export default Editor;
