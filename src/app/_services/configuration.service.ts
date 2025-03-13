import { Injectable } from '@angular/core';
import {Configuration} from '../_models/configuration';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  static config: Configuration;

  constructor() { }

  static fetchConfiguration(): Promise<Configuration> {
    return fetch('/assets/configuration.json')
      .then((response) => response.json());
  }

  static loadConfiguration(): Promise<Configuration> {
    if (ConfigurationService.config) {
      return new Promise<Configuration>((resolve, reject) => {
        resolve(ConfigurationService.config);
      })
    } else {
      return ConfigurationService.fetchConfiguration().then((configuration) => {
        ConfigurationService.config = configuration;
        return configuration;
      })
    }
  }


}
