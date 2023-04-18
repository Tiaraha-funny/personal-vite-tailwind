import { TouchableHighlight } from "react-native";
import { useLinkPressHandler } from "react-router-native";
import React from "react";
import {
    useHref,
    useLinkClickHandler,
} from "react-router-dom";

const StyledLink = styled("a", { color: "fuchsia" });
//   The useLinkClickHandler hook returns a click event handler for navigation when building a custom <Link> in react-router-dom.

export const Link = React.forwardRef(
    (
        {
            onClick,
            replace = false,
            state,
            target,
            to,
            ...rest
        },
        ref
    ) => {
        let href = useHref(to);
        let handleClick = useLinkClickHandler(to, {
            replace,
            state,
            target,
        });

        return (
            <StyledLink
                {...rest}
                href={href}
                onClick={(event) => {
                    onClick?.(event);
                    if (!event.defaultPrevented) {
                        handleClick(event);
                    }
                }}
                ref={ref}
                target={target}
            />
        );
    }
);
// the useLinkPressHandler returns a press event handler for custom <Link> navigation.
export function Link({
    onPress,
    replace = false,
    state,
    to,
    ...rest
  }) {
    let handlePress = useLinkPressHandler(to, {
      replace,
      state,
    });
  
    return (
      <TouchableHighlight
        {...rest}
        onPress={(event) => {
          onPress?.(event);
          if (!event.defaultPrevented) {
            handlePress(event);
          }
        }}
      />
    );
  }