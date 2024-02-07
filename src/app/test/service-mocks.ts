import { LocalStorageService } from '../services/local-storage.service'
import { ThemeService } from '../services/theme.service'

export const THEME_SERVICE = {
	provide: ThemeService,
	useValue: jasmine.createSpyObj(['load']),
}

export const LOCAL_STORAGE_SERVICE = {
	provide: LocalStorageService,
	useValue: jasmine.createSpyObj(['getSetTheme', 'deleteToken', 'getSetToken']),
}
