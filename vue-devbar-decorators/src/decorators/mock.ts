import Vue, {ComponentOptions} from "vue";
import {createDecorator} from "vue-class-component";
import {getDevbarOptions} from "../common/component-info";

export type MockGroupOptions = {
  label: string,
};
export type MockEntryOptions = {
  label: string,
};

export function MockGroup(groupOptions: MockGroupOptions = {}): MethodDecorator {
  return createDecorator((options: ComponentOptions<Vue>, key: string) => {
    const devbar = getDevbarOptions(options);
    if (!devbar.mocks[key]) {
      devbar.mocks[key] = createMockGroup(options, key, groupOptions);
    }
  });
}

function createMockGroup(options: ComponentOptions<Vue>, key: string, groupOptions: MockGroupOptions) {
  
}


export function Mock(mockOptions: MockEntryOptions = {}): MethodDecorator {
}
