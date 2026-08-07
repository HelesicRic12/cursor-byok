package i18n

import "testing"

func TestEnglishNativeWindowTitles(t *testing.T) {
	t.Parallel()

	tests := map[string]string{
		"window.metrics_detail":  "Session Analytics",
		"window.request_metrics": "Request Details",
		"window.stats_overlay":   "Stats Overlay",
	}
	for key, want := range tests {
		if got := T(LocaleEnUS, key); got != want {
			t.Errorf("T(%q, %q) = %q, want %q", LocaleEnUS, key, got, want)
		}
	}
}
